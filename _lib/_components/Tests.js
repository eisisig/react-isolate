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

/**
 * # TestList
 */
var _components = {
	_$TestList: {
		displayName: 'TestList'
	}
};

var _reactComponentWrapper = (0, _reactTransformHmr3['default'])({
	filename: '_src/_components/Tests.js',
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

var TestList = (function (_React$Component) {
	_inherits(TestList, _React$Component);

	function TestList() {
		var _this = this;

		_classCallCheck(this, _TestList);

		_get(Object.getPrototypeOf(_TestList.prototype), 'constructor', this).apply(this, arguments);

		this.handleRun = function () {
			var tests = _this.props.tests;

			alert('Should call ' + tests.fileName);
		};
	}

	_createClass(TestList, [{
		key: 'render',
		value: function render() {
			var tests = this.props.tests;

			var style = {
				height: '300px',
				width: '100%'
			};

			return _react2['default'].createElement(
				'div',
				{ className: 'TestList' },
				_react2['default'].createElement(
					'h3',
					null,
					'Tests ',
					tests.asserts && tests.asserts.length ? _react2['default'].createElement(
						'button',
						{ onClick: this.handleRun },
						'Run'
					) : null
				),
				tests.asserts.length ? _react2['default'].createElement(
					'div',
					null,
					_react2['default'].createElement(
						'ol',
						null,
						tests.asserts.map(function (test, i) {
							return _react2['default'].createElement(
								'li',
								{ key: i },
								test
							);
						})
					),
					_react2['default'].createElement('iframe', { style: style, src: '/runTest', frameBorder: '1' })
				) : _react2['default'].createElement(
					'div',
					{ className: 'Error' },
					'No tests found!'
				)
			);
		}
	}], [{
		key: 'propTypes',
		value: {
			tests: _react.PropTypes.array
		},
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {
			tests: []
		},
		enumerable: true
	}]);

	var _TestList = TestList;
	TestList = _wrapComponent('_$TestList')(TestList) || TestList;
	return TestList;
})(_react2['default'].Component);

exports['default'] = TestList;
module.exports = exports['default'];