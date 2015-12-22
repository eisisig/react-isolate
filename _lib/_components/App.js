'use strict';

var _reactTransformHmr2 = require('react-transform-hmr');

var _reactTransformHmr3 = _interopRequireDefault(_reactTransformHmr2);

var _react = require('react');

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react2 = _interopRequireDefault(_react);

var _SideBar = require('./SideBar');

var _SideBar2 = _interopRequireDefault(_SideBar);

var _stylesComponentsAppLess = require('../../_styles/components/App.less');

var _stylesComponentsAppLess2 = _interopRequireDefault(_stylesComponentsAppLess);

/**
 * # App
 */
var _components = {
	_$App: {
		displayName: 'App'
	}
};

var _reactComponentWrapper = (0, _reactTransformHmr3['default'])({
	filename: '_src/_components/App.js',
	components: _components,
	locals: [module],
	imports: [_react]
});

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return _reactComponentWrapper(ReactClass, uniqueId);
	};
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

'use strict';

var App = (function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, _App);

		_get(Object.getPrototypeOf(_App.prototype), 'constructor', this).apply(this, arguments);

		this.state = {
			currentFixture: null,
			currentComponent: null
		};
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var params = _props.params;
			var children = _props.children;
			var location = _props.location;
			var history = _props.history;
			var appData = _props.route.appData;

			var currentData = {
				currentDocs: null,
				currentFixture: null,
				currentComponent: null
			};

			var currentComponent = _.get(appData, [params.component, 'components', params.sub]);

			if (currentComponent) {
				currentData.currentComponent = currentComponent;
				try {
					currentData.currentDocs = require('!!docgen?markdownDescription!COMPONENTS_PATH/' + currentComponent.filePath.slice(2));

					if (Array.isArray(currentData.currentDocs)) {
						currentData.currentDocs = currentData.currentDocs[0];
					}
				} catch (e) {
					//console.log('App.requireDocs', e);
				}
			}

			var currentFixture = _.get(currentComponent, ['fixtures', params.fixture]);

			if (currentComponent && currentFixture) {
				currentData.currentFixture = currentFixture;
			}

			return _react2['default'].createElement(
				'div',
				{ className: _stylesComponentsAppLess2['default'].wrapper },
				_react2['default'].createElement(
					'div',
					{ className: _stylesComponentsAppLess2['default'].sidebar },
					_react2['default'].createElement(_SideBar2['default'], { components: appData, location: location, history: history, currentData: currentData })
				),
				_react2['default'].createElement(
					'div',
					{ className: _stylesComponentsAppLess2['default'].main },
					_react2['default'].Children.map(children, function (el) {
						return _react2['default'].cloneElement(el, { currentData: currentData });
					})
				)
			);
		}
	}]);

	var _App = App;
	App = _wrapComponent('_$App')(App) || App;
	return App;
})(_react2['default'].Component);

exports['default'] = App;
module.exports = exports['default'];