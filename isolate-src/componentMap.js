'use strict';

/**
 * TODO: Optimize this components/fixture fetching
 */
const merge = require('lodash.merge');
const reduceRight = require('lodash.reduceright');
const assign = require('lodash.assign');
const includes = require('lodash.includes');
// const appConfig = require('../isolate.config');

const componentsContext = require.context('COMPONENTS_PATH', true, /^\.\/.*\.js$/);
const filePaths = componentsContext.keys();
const componentMap = filePaths.reduce(createComponentMap, {});

function getFixturesPaths () {
	return filePaths.filter((path) => path.indexOf('/fixtures/') !== -1);
}

function createComponentMap (results, path) {
	return merge(results, createComponentPathTree(path));
}

function createComponentPathTree (path) {

	const pathArr = path.split('/');

	// Return if this is a fixture
	if ( path.indexOf('/fixtures/') !== -1 ) return;

	return reduceRight(pathArr, (results, part) => {

		if ( part === '.' || part === 'index.js' || part.startsWith('_') ) { return results; }

		if ( includes(part, '.js') ) {

			const name = removeExt(part);
			const fileContent = componentsContext(path);
			const Component = 'default' in fileContent ? fileContent.default : fileContent;

			const fixtures = {
				defaultProps: Component.defaultProps
			};

			let folder = path.split('/');
			folder.pop();
			folder = folder.join('/').concat('/fixtures/');

			const componentsFixtures = getFixturesPaths().filter((fixture) => fixture.indexOf(folder) !== -1);

			if ( componentsFixtures && componentsFixtures.length ) {
				componentsFixtures.forEach((fixturePath) => {
					const name = removeExt(fixturePath.split('/').pop());
					let fileContent = componentsContext(fixturePath);
					fileContent = 'default' in fileContent ? fileContent.default : fileContent;

					assign(fixtures, {
						[name]:	fileContent
					});
				});
			}

			return {
				[name]: {
					name,
					fixtures: fixtures,
					fileName: part,
					filePath: path,
					Component: Component
				}
			};

		} else {
			return assign({}, {
				[part]: {
					components: results
				}
			});
		}
	}, {});
}

function removeExt (file) {
	return file.replace('.js', '');
}

module.exports = componentMap;
