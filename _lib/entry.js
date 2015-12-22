'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _history = require('history');

var _reactRouter = require('react-router');

var _utils = require('./utils');

var _componentsApp = require('./_components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var _componentsPreview = require('./_components/Preview');

var _componentsPreview2 = _interopRequireDefault(_componentsPreview);

var _componentsDocumentation = require('./_components/Documentation');

var _componentsDocumentation2 = _interopRequireDefault(_componentsDocumentation);

/**
 * Components
 * @type {*}
 */
var componentsContext = require.context('COMPONENTS_PATH', true, /^\.\/.*\.js$/);
var componentsMap = componentsContext.keys().reduce(function (results, filePath) {

	var fileArr = (0, _utils.removeExtension)(filePath).split('/').splice(1);
	var Component = componentsContext(filePath);
	var mainComponentName = fileArr[0];

	if ('default' in Component) {
		Component = Component['default'];
	}

	if (!_lodash2['default'].contains(fileArr, 'index')) {
		var _name = fileArr.length > 1 ? fileArr[1] : fileArr[0];
		return _lodash2['default'].merge(results, _defineProperty({}, mainComponentName, {
			name: mainComponentName,
			components: _defineProperty({}, _name, {
				name: _name,
				Component: Component,
				filePath: filePath,
				fixtures: {
					defaultProps: {
						name: 'defaultProps',
						props: Component.defaultProps
					}
				}
			})
		}));
	}

	return results;
}, {});

/**
 * Components
 * @type {*}
 */
var docsContext = require.context('COMPONENTS_PATH', true, /^\.\/.*\.md$/);
var docsMap = docsContext.keys().reduce(function (results, filePath) {

	var fileArr = (0, _utils.removeExtension)(filePath, '.md').split('/').splice(1);
	var mainComponentName = fileArr[0];
	var name = fileArr.length > 2 ? fileArr[1] : fileArr[0];
	var docName = fileArr[fileArr.length - 1];

	return _lodash2['default'].merge(results, _defineProperty({}, mainComponentName, {
		name: mainComponentName,
		components: _defineProperty({}, name, {
			docs: _defineProperty({}, docName, {
				filePath: filePath,
				name: docName
			})
		})
	}));

	return results;
}, {});

/**
 * Fixtures
 * @type {*}
 */
var fixturesContext = require.context('FIXTURES_PATH', true, /^\.\/.*\.js$/);
var fixturesMap = fixturesContext.keys().reduce(function (results, filePath) {
	var props = fixturesContext(filePath);
	var fileArr = (0, _utils.removeExtension)(filePath).split('/').splice(1);
	var mainComponentName = fileArr[0];
	var subName = fileArr.length > 2 ? fileArr[1] : fileArr[0];
	var name = fileArr.pop();
	return _lodash2['default'].merge(results, _defineProperty({}, mainComponentName, {
		components: _defineProperty({}, subName, {
			fixtures: _defineProperty({}, name, {
				props: props,
				name: name,
				filePath: filePath
			})
		})
	}));
}, {});

/**
 * Tests
 * @type {exports|module.exports}
 */
//const testsMap = require('tojson!babel!LIB_PATH/tests');
var testsMap = {};

/**
 * Merge all data together
 */
var appData = _lodash2['default'].merge(componentsMap, fixturesMap, docsMap);

console.groupCollapsed('Components total:', Object.keys(appData).length);
Object.keys(appData).forEach(function (key) {
	console.groupCollapsed(key, appData[key].components ? Object.keys(appData[key].components).length : '');
	console.log(appData[key]);
	console.groupEnd();
});
console.groupEnd();

var history = (0, _history.useBasename)(_history.createHistory)({
	basename: '/'
});

// default behavior
var createElement = function createElement(Component, props) {
	return _react2['default'].createElement(Component, _extends({ components: appData }, props));
};

/**
 * Render App Component
 */
exports['default'] = _reactDom2['default'].render(_react2['default'].createElement(
	_reactRouter.Router,
	{ history: history },
	_react2['default'].createElement(
		_reactRouter.Route,
		{ path: '/', component: _componentsApp2['default'], appData: appData },
		_react2['default'].createElement(
			_reactRouter.Route,
			{ path: ':component', component: _componentsDocumentation2['default'] },
			_react2['default'].createElement(
				_reactRouter.Route,
				{ path: ':sub' },
				_react2['default'].createElement(_reactRouter.Route, { path: ':fixture', component: _componentsPreview2['default'] })
			)
		)
	)
), document.getElementById('root'));
module.exports = exports['default'];