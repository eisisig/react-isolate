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

var _PropList = require('./PropList');

var _PropList2 = _interopRequireDefault(_PropList);

var _Docs = require('./Docs');

var _Docs2 = _interopRequireDefault(_Docs);

var _stylesComponentsDocumentationLess = require('../../_styles/components/Documentation.less');

var _stylesComponentsDocumentationLess2 = _interopRequireDefault(_stylesComponentsDocumentationLess);

/**
 * # Documentation
 */
//import analyzeRender from '../_lib/analyzeRender';
//@analyzeRender
var _components = {
	_$Documentation: {
		displayName: 'Documentation'
	}
};

var _reactComponentWrapper = (0, _reactTransformHmr3['default'])({
	filename: '_src/_components/Documentation.js',
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

var Documentation = (function (_React$Component) {
	_inherits(Documentation, _React$Component);

	function Documentation() {
		_classCallCheck(this, _Documentation);

		_get(Object.getPrototypeOf(_Documentation.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Documentation, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var currentData = _props.currentData;
			var children = _props.children;

			return _react2['default'].createElement(
				'div',
				{ className: _stylesComponentsDocumentationLess2['default'].wrapper },
				currentData.currentDocs ? _react2['default'].createElement(
					'div',
					{ className: _stylesComponentsDocumentationLess2['default'].docs },
					_react2['default'].createElement(_PropList2['default'], currentData),
					currentData.currentComponent && currentData.currentComponent.docs ? _react2['default'].createElement(_Docs2['default'], { docs: currentData.currentComponent.docs }) : null
				) : null,
				currentData.currentFixture ? _react2['default'].createElement(
					'div',
					{ className: _stylesComponentsDocumentationLess2['default'].preview },
					_react2['default'].Children.map(children, function (el) {
						return _react2['default'].cloneElement(el, { currentData: currentData, codeText: currentData.currentFixture.props });
					})
				) : null
			);
		}
	}]);

	var _Documentation = Documentation;
	Documentation = _wrapComponent('_$Documentation')(Documentation) || Documentation;
	return Documentation;
})(_react2['default'].Component);

exports['default'] = Documentation;
module.exports = exports['default'];