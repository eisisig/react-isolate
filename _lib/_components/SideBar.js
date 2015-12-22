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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRouter = require('react-router');

var _stylesUiLess = require('../../_styles/ui.less');

var _stylesUiLess2 = _interopRequireDefault(_stylesUiLess);

var _stylesComponentsSideBarLess = require('../../_styles/components/SideBar.less');

var _stylesComponentsSideBarLess2 = _interopRequireDefault(_stylesComponentsSideBarLess);

/**
 * SideBar
 * @class SideBar
 */
//import analyzeRender from '../_lib/analyzeRender';
//@analyzeRender
var _components = {
	_$SideBar: {
		displayName: 'SideBar'
	}
};

var _reactComponentWrapper = (0, _reactTransformHmr3['default'])({
	filename: '_src/_components/SideBar.js',
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

var SideBar = (function (_React$Component) {
	_inherits(SideBar, _React$Component);

	function SideBar() {
		var _this = this;

		_classCallCheck(this, _SideBar);

		_get(Object.getPrototypeOf(_SideBar.prototype), 'constructor', this).apply(this, arguments);

		this.state = {
			filteredList: null
		};

		this.handleSearch = function (e) {
			var components = _this.props.components;

			var value = e.target.value.toLowerCase();

			var filtered = _lodash2['default'].filter(components, function (item) {
				if (item.name.toLowerCase().indexOf(value) !== -1) {
					return item;
				}
				return _lodash2['default'].find(item.components, function (item) {
					return item.name.toLowerCase().indexOf(value) !== -1;
				});
			});

			if (filtered) {
				_this.setState({
					filteredList: _lodash2['default'].indexBy(filtered, 'name')
				});
			}

			if (!value) {
				_this.handleClearSearch();
			}
		};

		this.handleClearSearch = function (e) {
			_this.refs.search.value = '';
			_this.setState({ filteredList: null });
		};

		this.renderSearch = function () {
			var filteredList = _this.state.filteredList;

			return _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement('input', { className: _stylesComponentsSideBarLess2['default'].searchInput, ref: 'search', type: 'text', placeholder: 'Filter components', onChange: _this.handleSearch }),
				filteredList ? _react2['default'].createElement(
					'button',
					{ className: _stylesComponentsSideBarLess2['default'].searchClear, onClick: _this.handleClearSearch },
					'X'
				) : null
			);
		};

		this.renderList = function (componentList) {
			var pathname = _this.props.location.pathname;

			var pathArr = pathname.split('/');
			return _react2['default'].createElement(
				'ul',
				{ className: _stylesComponentsSideBarLess2['default'].componentList },
				_lodash2['default'].map(componentList, function (component, i) {
					var hideHeader = Object.keys(component.components).length <= 1 && Object.keys(component.components)[0].toLowerCase() !== 'demo';
					return _react2['default'].createElement(
						'li',
						{ key: i, className: _stylesComponentsSideBarLess2['default'].componentListItem },
						!hideHeader ? _react2['default'].createElement(
							'h1',
							{ className: '' + _stylesComponentsSideBarLess2['default'].componentHeader },
							component.name
						) : null,
						component.components ? _react2['default'].createElement(
							'ul',
							{ className: _stylesComponentsSideBarLess2['default'].subList },
							_lodash2['default'].map(component.components, function (subComponent, i) {
								var totalFixtures = subComponent.fixtures ? Object.keys(subComponent.fixtures).length - 1 : null;
								var defaultComponentName = _this.getFirstFixtureName(subComponent.fixtures);
								var path = '/' + component.name + '/' + subComponent.name + '/' + defaultComponentName;
								var current = pathArr[0] === component.name && pathArr[1] === subComponent.name;

								//const firstLink = subComponent.fixtures ? subComponent.fixtures[Object.keys(subComponent.fixtures)[0]] : null;
								return _react2['default'].createElement(
									'li',
									{ key: i, className: _stylesComponentsSideBarLess2['default'].subList },
									_react2['default'].createElement(
										_reactRouter.Link,
										{ className: _stylesComponentsSideBarLess2['default'].subLink + ' ' + (current ? _stylesComponentsSideBarLess2['default'].subLinkCurrent : ''),
											to: path },
										subComponent.name,
										totalFixtures ? _react2['default'].createElement(
											'span',
											{ className: _stylesUiLess2['default'].badge },
											totalFixtures
										) : null
									),
									current && subComponent.fixtures && Object.keys(subComponent.fixtures).length > 1 ? _react2['default'].createElement(
										'ul',
										{ className: _stylesComponentsSideBarLess2['default'].fixtureList },
										_lodash2['default'].map(subComponent.fixtures, function (fixture, i) {
											if (fixture.name !== 'defaultProps') {
												var _path = '/' + component.name + '/' + subComponent.name + '/' + fixture.name;
												var _current = pathArr[0] === component.name && pathArr[1] === subComponent.name && pathArr[2] === fixture.name;
												return _react2['default'].createElement(
													'li',
													{ key: i, className: _stylesComponentsSideBarLess2['default'].fixtureListItem },
													_react2['default'].createElement(
														_reactRouter.Link,
														{
															className: _stylesComponentsSideBarLess2['default'].fixtureLink + ' ' + (_current ? _stylesComponentsSideBarLess2['default'].fixtureLinkCurrent : ''),
															to: _path },
														fixture.name
													)
												);
											}
										})
									) : null
								);
							})
						) : null
					);
				})
			);
		};
	}

	_createClass(SideBar, [{
		key: 'getFirstFixtureName',
		value: function getFirstFixtureName(fixtures) {
			var keys = _lodash2['default'].keys(fixtures);
			if (keys.length > 1 && keys[1] != 'defaultProps') return keys[1];
			return keys[0];
		}
	}, {
		key: 'render',
		value: function render() {
			var components = this.props.components;
			var filteredList = this.state.filteredList;

			return _react2['default'].createElement(
				'div',
				{ className: _stylesComponentsSideBarLess2['default'].wrapper },
				_react2['default'].createElement(_reactRouter.Link, { to: '/', className: _stylesComponentsSideBarLess2['default'].title, to: '/' }),
				_react2['default'].createElement(
					'div',
					{ className: _stylesComponentsSideBarLess2['default'].search },
					this.renderSearch()
				),
				_react2['default'].createElement(
					'div',
					{ className: _stylesComponentsSideBarLess2['default'].list },
					this.renderList(filteredList || components)
				)
			);
		}
	}]);

	var _SideBar = SideBar;
	SideBar = _wrapComponent('_$SideBar')(SideBar) || SideBar;
	return SideBar;
})(_react2['default'].Component);

exports['default'] = SideBar;
module.exports = exports['default'];