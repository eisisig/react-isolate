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

var _codemirror = require('codemirror');

var _codemirror2 = _interopRequireDefault(_codemirror);

require('codemirror/mode/javascript/javascript');

//import styles from '../_styles/components/Markup.less';

/**
 * Markup
 * @class Markup
 */
var _components = {
	_$Markup: {
		displayName: 'Markup'
	}
};

var _reactComponentWrapper = (0, _reactTransformHmr3['default'])({
	filename: '_src/_components/Markup.js',
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

var Markup = (function (_React$Component) {
	_inherits(Markup, _React$Component);

	function Markup() {
		_classCallCheck(this, _Markup);

		_get(Object.getPrototypeOf(_Markup.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Markup, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.editor = _codemirror2['default'].fromTextArea(this.refs.markup, {
				mode: 'javascript',
				lineNumbers: false,
				smartIndent: true,
				lineWrapping: true,
				tabSize: 4,
				matchBrackets: true,
				theme: 'material',
				readOnly: true
			});
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.editor.setValue(this.props.codeText);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'Markup' },
				_react2['default'].createElement('textarea', { ref: 'markup', defaultValue: this.props.codeText })
			);
		}
	}, {
		key: 'setCode',
		value: function setCode(code) {
			this.editor.getDoc().setValue(code);
			this.handleChange();
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
	}]);

	var _Markup = Markup;
	Markup = _wrapComponent('_$Markup')(Markup) || Markup;
	return Markup;
})(_react2['default'].Component);

exports['default'] = Markup;
module.exports = exports['default'];