'use strict';

const path = require('path');
const globby = require('globby');
const merge = require('lodash/merge');
const reduce = require('lodash/reduce');
const reduceRight = require('lodash/reduceRight');
const assign = require('lodash/assign');
const includes = require('lodash/includes');

const BASE_PATH = 'demo/components';
const BASE_ABS_PATH = path.resolve(BASE_PATH);

const COMPONENT_PATH = path.resolve(BASE_PATH, '**/*.js');
const FIXTURE_PATH = path.resolve(BASE_PATH, '**/fixtures/**');
const TEST_PATH = path.resolve(BASE_PATH, '**/tests/**');

const ALLOWED_FOLDER_NAMES = ['components', 'fixturesw', 'tests'];

const componentFiles = globby.sync([
	COMPONENT_PATH,
	'!' + FIXTURE_PATH
]);

const fixtureFiles = globby.sync([
	'!' + COMPONENT_PATH,
	FIXTURE_PATH
]);

const componentMap = reduce(componentFiles, createMap('components'), {});
const fixtureMap = reduce(fixtureFiles, createMap('fixtures'), {});

function createMap (type) {
	return function (results, path) {
		const cleanPath = path.replace(BASE_ABS_PATH + '/', '');
		const pathArr = cleanPath.split('/');
		return merge(results, createPathTree(pathArr, type));
	}
}

function createPathTree (pathArr, type) {
	return reduceRight(pathArr, (results, part) => {

		if ( part === 'fixtures' || part === 'index.js' ) { return results; }

		if ( includes(part, '.js') ) {
			return {
				[removeExt(part)]: {
					fileName: part,
					filePath: path.resolve(BASE_PATH, pathArr.join('/'))
				}
			}
		} else {
			return assign({}, {
				[part]: {
					[type]: results
				}
			})
		}
	}, {});
}

function removeExt (file) {
	return file.replace('.js', '');
}

// console.log('componentFiles', componentFiles);
// console.log('componentMap', JSON.stringify(componentMap, null, 4));
// console.log('fixtureMap', JSON.stringify(fixtureMap, null, 4));

// console.log('map', JSON.stringify(merge(fixtureMap, componentMap), null, 4));

module.exports = merge(fixtureMap, componentMap);

// console.log('fixtureFiles', fixtureFiles);

// console.log('componentMap', componentMap);
