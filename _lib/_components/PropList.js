'use strict';

var _reactTransformHmr2 = require('react-transform-hmr');

var _reactTransformHmr3 = _interopRequireDefault(_reactTransformHmr2);

var _react = require('react');

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react2 = _interopRequireDefault(_react);

var _stylesComponentsPropListLess = require('../../_styles/components/PropList.less');

var _stylesComponentsPropListLess2 = _interopRequireDefault(_stylesComponentsPropListLess);

var _stylesUiLess = require('../../_styles/ui.less');

var _stylesUiLess2 = _interopRequireDefault(_stylesUiLess);

/**
 * # PropList
 * @class PropList
 */
var _components = {
	_$PropList: {
		displayName: 'PropList'
	}
};

var _reactComponentWrapper = (0, _reactTransformHmr3['default'])({
	filename: '_src/_components/PropList.js',
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

var PropList = (function (_React$Component) {
	_inherits(PropList, _React$Component);

	function PropList() {
		_classCallCheck(this, _PropList);

		_get(Object.getPrototypeOf(_PropList.prototype), 'constructor', this).apply(this, arguments);

		this.sortProps = function (props) {
			return _.sortByOrder(Object.keys(props).map(function (prop) {
				return _extends({
					name: prop
				}, props[prop]);
			}), ['required', 'name'], false);
		};

		this.getType = function (prop) {
			return prop.type ? prop.type.name : null;
		};

		this.getDefault = function (prop) {
			if (!prop.defaultValue) return null;
			return _react2['default'].createElement(
				'span',
				{ className: _stylesUiLess2['default'].code },
				prop.defaultValue.value
			);
		};

		this.getTypeValues = function (prop) {

			if (!prop.hasOwnProperty('value') && !prop.hasOwnProperty('type')) return null;

			var _prop$type = prop.type;
			var value = _prop$type.value;
			var type = _prop$type.name;
			var raw = _prop$type.raw;

			// shape
			if (value && type === 'shape') {
				return Object.keys(value).map(function (key, i) {
					return _react2['default'].createElement(
						'span',
						{ className: _stylesUiLess2['default'].code },
						key + '<' + value[key].name + '>'
					);
				});
			}
			// arrayOf
			else if (value && type === 'arrayOf') {
					return _react2['default'].createElement(
						'span',
						null,
						'[',
						_react2['default'].createElement(
							'span',
							{ className: _stylesUiLess2['default'].code },
							'<' + value.name + '>'
						),
						',...]'
					);
				}
				// enum, union
				else if (value && (type === 'enum' || type === 'union')) {
						return _react2['default'].createElement(
							'span',
							{ className: _stylesUiLess2['default'].code },
							value.map(function (en, i) {
								return ('' + (en.name || en.value)).replace(/'/gmi, '');
							}).join(', ')
						);
					}
					// instanceOf
					else if (value && type === 'instanceOf') {
							return _react2['default'].createElement(
								'span',
								{ className: _stylesUiLess2['default'].codet },
								value + '()'
							);
						}
						// custom
						else if (type === 'custom') {
								return _react2['default'].createElement(
									'span',
									{ className: _stylesUiLess2['default'].code },
									raw
								);
							} else {
								//console.log('I fell through', 'type', type, 'value', value);
							}
		};
	}

	_createClass(PropList, [{
		key: 'render',
		value: function render() {
			var _this = this;

			var _props = this.props;
			var currentDocs = _props.currentDocs;
			var currentComponent = _props.currentComponent;
			var props = _props.currentDocs.props;

			if (!props) {
				return null;
			}

			var sortedProps = this.sortProps(props);

			return _react2['default'].createElement(
				'div',
				{ className: _stylesComponentsPropListLess2['default'].wrapper },
				currentDocs.props ? _react2['default'].createElement(
					'div',
					null,
					_react2['default'].createElement(
						'h3',
						{ className: _stylesUiLess2['default'].header },
						'Props'
					),
					_react2['default'].createElement(
						'table',
						{ className: 'iso-table iso-table--bordered' },
						_react2['default'].createElement(
							'thead',
							null,
							_react2['default'].createElement(
								'tr',
								null,
								_react2['default'].createElement(
									'th',
									null,
									'Name'
								),
								_react2['default'].createElement(
									'th',
									null,
									'Type'
								),
								_react2['default'].createElement(
									'th',
									null,
									'Values'
								),
								_react2['default'].createElement(
									'th',
									null,
									'Default'
								),
								_react2['default'].createElement(
									'th',
									null,
									'Description'
								)
							)
						),
						_react2['default'].createElement(
							'tbody',
							null,
							sortedProps.map(function (prop, i) {
								return _react2['default'].createElement(
									'tr',
									{ key: i, className: '' + (prop.required ? 'is-required' : '') },
									_react2['default'].createElement(
										'td',
										null,
										_react2['default'].createElement(
											'strong',
											null,
											prop.name + (prop.required ? '*' : '')
										)
									),
									_react2['default'].createElement(
										'td',
										null,
										_react2['default'].createElement(
											'em',
											null,
											_react2['default'].createElement(
												'span',
												{ className: _stylesUiLess2['default'].code },
												_this.getType(prop)
											)
										)
									),
									_react2['default'].createElement(
										'td',
										null,
										_this.getTypeValues(prop)
									),
									_react2['default'].createElement(
										'td',
										null,
										_this.getDefault(prop)
									),
									_react2['default'].createElement(
										'td',
										null,
										prop.description
									)
								);
							})
						)
					)
				) : null
			);
		}
	}], [{
		key: 'propTypes',
		value: {
			docs: _react.PropTypes.object
		},
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {
			docs: null
		},
		enumerable: true
	}]);

	var _PropList = PropList;
	PropList = _wrapComponent('_$PropList')(PropList) || PropList;
	return PropList;
})(_react2['default'].Component);

exports['default'] = PropList;
module.exports = exports['default'];
/*
<div>
	<h3 className={ ui.header }>Description</h3>
	<div dangerouslySetInnerHTML={{ __html: currentDocs.description }}></div>
</div>
<h1>{ currentComponent.name }</h1>
*/