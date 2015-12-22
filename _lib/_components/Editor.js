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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react2 = _interopRequireDefault(_react);

var _codemirror = require('codemirror');

var _codemirror2 = _interopRequireDefault(_codemirror);

require('codemirror/mode/javascript/javascript');

require('codemirror/lib/codemirror.css');

require('codemirror/theme/material.css');

require('codemirror/addon/lint/javascript-lint');

require('codemirror/addon/lint/lint');

require('codemirror/addon/lint/lint.css');

require('codemirror/addon/lint/json-lint');

var _stylesComponentsEditorLess = require('../../_styles/components/Editor.less');

var _stylesComponentsEditorLess2 = _interopRequireDefault(_stylesComponentsEditorLess);

/**
 * Editor
 * @class Editor
 */
//import analyzeRender from '../_lib/analyzeRender';
//@analyzeRender
var _components = {
	_$Editor: {
		displayName: 'Editor'
	}
};

var _reactComponentWrapper = (0, _reactTransformHmr3['default'])({
	filename: '_src/_components/Editor.js',
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

var Editor = (function (_React$Component) {
	_inherits(Editor, _React$Component);

	function Editor() {
		var _this = this;

		_classCallCheck(this, _Editor);

		_get(Object.getPrototypeOf(_Editor.prototype), 'constructor', this).apply(this, arguments);

		this.handleChange = function () {
			var _props = _this.props;
			var readOnly = _props.readOnly;
			var onChange = _props.onChange;

			if (!readOnly && onChange) {
				onChange(_this.editor.getValue());
			}
		};
	}

	_createClass(Editor, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.editor = _codemirror2['default'].fromTextArea(this.refs.editor, {
				mode: 'application/json',
				lineNumbers: false,
				smartIndent: true,
				lineWrapping: true,
				tabSize: 4,
				matchBrackets: true,
				gutters: ['CodeMirror-lint-markers'],
				lint: true,
				theme: 'material',
				readOnly: false
			});

			this.editor.on('change', this.handleChange);
		}
	}, {
		key: 'render',
		value: function render() {
			var codeText = this.props.codeText;

			return _react2['default'].createElement(
				'div',
				{ className: 'Editor' },
				_react2['default'].createElement('textarea', { ref: 'editor', defaultValue: JSON.stringify(codeText, null, 4) })
			);
		}
	}], [{
		key: 'propTypes',
		value: {
			className: _react2['default'].PropTypes.string,
			lineNumbers: _react2['default'].PropTypes.bool,
			onChange: _react2['default'].PropTypes.func,
			readOnly: _react2['default'].PropTypes.bool,
			tabSize: _react2['default'].PropTypes.number,
			theme: _react2['default'].PropTypes.string
		},
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {},
		enumerable: true
	}]);

	var _Editor = Editor;
	Editor = _wrapComponent('_$Editor')(Editor) || Editor;
	return Editor;
})(_react2['default'].Component);

exports['default'] = Editor;
module.exports = exports['default'];