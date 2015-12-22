'use strict';

import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import glob from 'glob';
import babel from 'babel-core/lib/api/browser';
import { argv } from 'yargs';
import esprima from 'esprima';

const isolateDefaultConfig = require(path.resolve(__dirname, '..', 'isolate.config.js'));

let isolateCustomConfig = {};

try {
	isolateCustomConfig = require(path.resolve(process.cwd(), 'isolate.config.js'));
} catch ( e ) {
	//console.log('No custom isolate.config.js found');
}

const isolateConfig = _.merge({}, isolateDefaultConfig, isolateCustomConfig);

const tests = glob.sync(path.resolve(process.cwd(), argv.testsPath || isolateConfig.testsPath, '**/*.js'));

const testMap = tests.reduce(( results, fileName ) => {

	const parts = fileName.split('/');
	const index = parts.indexOf('tests');
	const componentName = parts.slice(index + 1)[0];

	// TODO: Remove this custom check
	if ( componentName === 'format' || componentName === 'dom.js' ) {
		return results;
	}

	console.log('componentName', componentName);

	try {
		const test = fs.readFileSync(fileName, 'utf8');
		const testData = parseFile(test);

		return _.merge(results, {
			[componentName]: {
				tests: {
					fileName: fileName,
					asserts: testData
				}
			}
		}, ( a, b ) => {
			if ( Array.isArray(a) ) {
				return a.concat(b);
			}
		});

	} catch ( e ) {
		console.log('e', e);
		return results;
	}

}, {});

function parseFile ( file ) {

	let results = [];

	const transformed = babel.transform(file);

	const tree = esprima.parse(transformed, {
		tolerant: true
	});

	for ( let branch of tree.body ) {
		console.log('branch', branch);
		if ( branch.type === 'ExpressionStatement' && branch.expression.type === 'CallExpression' ) {
			const subBranch = branch.expression['arguments'];
			console.log('subBranch', subBranch);
			for ( let line of subBranch ) {
				if ( line.type === 'FunctionExpression' ) {
					for ( let test of line.body.body ) {
						results.push(test.expression['arguments'][0].value);
					}
				}
			}
		}
	}

	return results;

}

export default testMap;
