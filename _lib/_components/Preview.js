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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react2 = _interopRequireDefault(_react);

var _libUtils = require('../_lib/utils');

var _Editor = require('./Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _Markup = require('./Markup');

var _Markup2 = _interopRequireDefault(_Markup);

var _stylesComponentsPreviewLess = require('../../_styles/components/Preview.less');

var _stylesComponentsPreviewLess2 = _interopRequireDefault(_stylesComponentsPreviewLess);

var _stylesUiLess = require('../../_styles/ui.less');

var _stylesUiLess2 = _interopRequireDefault(_stylesUiLess);

/**
 * # PreviewPanel
 */
//import analyzeRender from '../_lib/analyzeRender';
//@analyzeRender
var _components = {
	_$Preview: {
		displayName: 'Preview'
	}
};

var _reactComponentWrapper = (0, _reactTransformHmr3['default'])({
	filename: '_src/_components/Preview.js',
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

var Preview = (function (_React$Component) {
	_inherits(Preview, _React$Component);

	function Preview() {
		var _this = this;

		_classCallCheck(this, _Preview);

		_get(Object.getPrototypeOf(_Preview.prototype), 'constructor', this).apply(this, arguments);

		this.state = {
			code: this.props.codeText
		};

		this.handleCodeChange = function (code) {
			try {
				code = JSON.parse(code);
				_this.setState({ code: code }, function () {
					_this.handlePreviewRender();
				});
			} catch (e) {
				//console.log('e', e);
			}
		};

		this.DOMNode = function () {
			var currentComponent = _this.props.currentData.currentComponent;

			var code = _this.state.code;

			var Component = currentComponent.Component;

			try {
				return _react2['default'].createElement(Component, _extends({}, code));
			} catch (e) {
				console.log('e', e);
				return _react2['default'].createElement(
					'div',
					null,
					'ERROR in props: ',
					e.message
				);
			}
		};

		this.handlePreviewRender = function () {
			var preview = _this.refs.preview;
			var code = _this.state.code;
			var state = code.state;

			_reactDom2['default'].unmountComponentAtNode(preview);

			var renderedComponent = _reactDom2['default'].render(_this.DOMNode(), preview);

			if (!state && renderedComponent && 'state' in renderedComponent) {
				state = renderedComponent.state;
			}

			if (state) {
				renderedComponent.setState(state, function () {
					renderedComponent.setState = _lodash2['default'].wrap(renderedComponent.setState, function (caller, value) {
						caller.call(renderedComponent, value);
						var newProps = _lodash2['default'].assign(code, { state: value });
						_this.setState(newProps, function () {
							_this.handleEditorRender(newProps);
						});
					});
				});
			}
		};

		this.handleEditorRender = function () {
			var editor = _this.refs.editor;

			_reactDom2['default'].unmountComponentAtNode(editor);
			_reactDom2['default'].render(_react2['default'].createElement(_Editor2['default'], { onChange: _this.handleCodeChange, codeText: _this.state.code }), editor);
		};
	}

	_createClass(Preview, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.handlePreviewRender();
			this.handleEditorRender();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(nextProps) {
			var currentComponentName = this.props.currentData.currentComponent.name,
			    nextComponentName = nextProps.currentData.currentComponent.name,
			    currentName = this.props.currentData.currentFixture.name,
			    nextName = nextProps.currentData.currentFixture.name;

			var doUpdate = !_lodash2['default'].isEqual(currentName, nextName) || !_lodash2['default'].isEqual(currentComponentName, nextComponentName);

			if (doUpdate) {
				this.handleEditorRender();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(_ref) {
			var codeText = _ref.codeText;

			if (!_lodash2['default'].isEqual(this.state.code, codeText)) {
				this.handleCodeChange(JSON.stringify(codeText));
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props$currentData = this.props.currentData;
			var currentComponent = _props$currentData.currentComponent;
			var currentFixture = _props$currentData.currentFixture;
			var code = this.state.code;

			return _react2['default'].createElement(
				'div',
				{ className: _stylesComponentsPreviewLess2['default'].wrapper },
				_react2['default'].createElement(
					'div',
					{ className: _stylesComponentsPreviewLess2['default'].preview },
					_react2['default'].createElement(
						'h3',
						{ className: _stylesUiLess2['default'].header },
						'Preview (' + currentFixture.name + ')'
					),
					_react2['default'].createElement('div', { ref: 'preview' })
				),
				_react2['default'].createElement(
					'div',
					{ className: _stylesComponentsPreviewLess2['default'].markup },
					_react2['default'].createElement(
						'h3',
						{ className: _stylesUiLess2['default'].header },
						'Markup'
					),
					_react2['default'].createElement(_Markup2['default'], { codeText: (0, _libUtils.renderComponentMarkup)(currentComponent.name, currentFixture.name !== 'defaultProps' || !_lodash2['default'].isEqual(code, currentFixture.props) ? code : null) })
				),
				_react2['default'].createElement(
					'div',
					{ className: _stylesComponentsPreviewLess2['default'].editor },
					_react2['default'].createElement(
						'h3',
						{ className: _stylesUiLess2['default'].header },
						'Props / state'
					),
					_react2['default'].createElement('div', { ref: 'editor' })
				)
			);
		}
	}], [{
		key: 'contextTypes',
		value: {
			router: _react.PropTypes.object
		},
		enumerable: true
	}]);

	var _Preview = Preview;
	Preview = _wrapComponent('_$Preview')(Preview) || Preview;
	return Preview;
})(_react2['default'].Component);

exports['default'] = Preview;
module.exports = exports['default'];