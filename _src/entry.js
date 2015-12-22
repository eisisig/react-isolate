'use strict';

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory, useBasename } from 'history';
import { Router, Route } from 'react-router';
import { removeExtension } from './utils';

import App from '../_components/App';
import Preview from '../_components/Preview';
import Documentation from '../_components/Documentation';

/**
 * Components
 * @type {*}
 */
const componentsContext = require.context('COMPONENTS_PATH', true, /^\.\/.*\.js$/);
const componentsMap = componentsContext.keys().reduce(( results, filePath ) => {

	const fileArr = removeExtension(filePath).split('/').splice(1);
	let Component = componentsContext(filePath);
	const mainComponentName = fileArr[0];

	if ( 'default' in Component ) {
		Component = Component.default;
	}

	if ( !_.contains(fileArr, 'index') ) {
		const name = fileArr.length > 1 ? fileArr[1] : fileArr[0];
		return _.merge(results, {
			[mainComponentName]: {
				name: mainComponentName,
				components: {
					[name]: {
						name,
						Component,
						filePath,
						fixtures: {
							defaultProps: {
								name: 'defaultProps',
								props: Component.defaultProps
							}
						}
					}
				}
			}
		});
	}

	return results;
}, {});

/**
 * Components
 * @type {*}
 */
const docsContext = require.context('COMPONENTS_PATH', true, /^\.\/.*\.md$/);
const docsMap = docsContext.keys().reduce(( results, filePath ) => {

	const fileArr = removeExtension(filePath, '.md').split('/').splice(1);
	const mainComponentName = fileArr[0];
	const name = fileArr.length > 2 ? fileArr[1] : fileArr[0];
	const docName = fileArr[fileArr.length - 1];

	return _.merge(results, {
		[mainComponentName]: {
			name: mainComponentName,
			components: {
				[name]: {
					docs: {
						[docName]: {
							filePath,
							name: docName
						}
					}
				}
			}
		}
	});

	return results;
}, {});

/**
 * Fixtures
 * @type {*}
 */
const fixturesContext = require.context('FIXTURES_PATH', true, /^\.\/.*\.js$/);
const fixturesMap = fixturesContext.keys().reduce(( results, filePath ) => {
	const props = fixturesContext(filePath);
	const fileArr = removeExtension(filePath).split('/').splice(1);
	const mainComponentName = fileArr[0];
	const subName = fileArr.length > 2 ? fileArr[1] : fileArr[0];
	const name = fileArr.pop();
	return _.merge(results, {
		[mainComponentName]: {
			components: {
				[subName]: {
					fixtures: {
						[name]: {
							props,
							name,
							filePath
						}
					}
				}
			}
		}
	});
}, {});

/**
 * Tests
 * @type {exports|module.exports}
 */
      //const testsMap = require('tojson!babel!LIB_PATH/tests');
const testsMap = {};

/**
 * Merge all data together
 */
const appData = _.merge(componentsMap, fixturesMap, docsMap);

console.groupCollapsed('Components total:', Object.keys(appData).length);
Object.keys(appData).forEach(( key ) => {
	console.groupCollapsed(key, (appData[key].components) ? Object.keys(appData[key].components).length : '');
	console.log(appData[key]);
	console.groupEnd();
});
console.groupEnd();

const history = useBasename(createHistory)({
	basename: '/'
});

// default behavior
const createElement = ( Component, props ) => <Component components={ appData } { ...props } />;

/**
 * Render App Component
 */
export default ReactDOM.render((
	<Router history={ history }>
		<Route path="/" component={ App } appData={ appData }>
			<Route path=":component" component={ Documentation }>
				<Route path=":sub">
					<Route path=":fixture" component={ Preview } />
				</Route>
			</Route>
		</Route>
	</Router>
), document.getElementById('root'));
