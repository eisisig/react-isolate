'use strict';

const path = require('path');
// const globby = require('globby');
const merge = require('lodash.merge');
const reduce = require('lodash.reduce');
const reduceRight = require('lodash.reduceright');
const assign = require('lodash.assign');
const includes = require('lodash.includes');

const appConfig = require('../isolate.config');

const BASE_PATH = appConfig.componentsPath;
const BASE_ABS_PATH = path.resolve(BASE_PATH);

const COMPONENT_PATH = path.resolve(BASE_PATH, '**/*.js');
const FIXTURE_PATH = path.resolve(BASE_PATH, '**/fixtures/**');

// const componentFiles = globby.sync([
// 	COMPONENT_PATH,
// 	'!' + FIXTURE_PATH,
// 	'!**/_*/**'
// ]);

// const componentsContext = require.context('COMPONENTS_PATH', true, /^\.\/.*\.js$/);
const componentsContext = require.context('COMPONENTS_PATH', true, /^\.\/(?!.*fixtures).*\.js$/);

const componentMap = componentsContext.keys().reduce(createMap, {})

// const componentMap = reduce(componentFiles, createMap('components'), {});

function createMap (results, path) {
	return merge(results, createPathTree(path));
}

function createPathTree (path) {

	const pathArr = path.split('/');

	return reduceRight(pathArr, (results, part) => {

		if ( part === '.' || part === 'fixtures' || part === 'index.js' || part.startsWith('_') ) { return results; }

		if ( includes(part, '.js') ) {

			// let componentFolder = [...pathArr];
			//
			// componentFolder.pop();
			// componentFolder = componentFolder.join('/');
			//
			// const fixtures = globby.sync([
			// 	path.resolve(BASE_PATH, componentFolder, 'fixtures', '**', '*.js')
			// ]);
			//

			const name = removeExt(part);
			const fixtures = {};
			let Component = componentsContext(path);

			Component = 'default' in Component ? Component.default : Component;

			fixtures.defaultProps = Component.defaultProps;

			return {
				[name]: {
					name,
					fixtures,
					fileName: part,
					filePath: path,
					Component: Component
				}
			}
		} else {
			return assign({}, {
				[part]: {
					['components']: results
				}
			})
		}
	}, {});
}

function removeExt (file) {
	return file.replace('.js', '');
}

// module.exports = merge(fixtureMap, componentMap);
module.exports = componentMap;
// module.exports = {};
