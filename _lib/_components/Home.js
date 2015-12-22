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
 * # HomePanel
 */
var _components = {
	_$HomePanel: {
		displayName: 'HomePanel'
	}
};

var _reactComponentWrapper = (0, _reactTransformHmr3['default'])({
	filename: '_src/_components/Home.js',
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

var HomePanel = (function (_React$Component) {
	_inherits(HomePanel, _React$Component);

	function HomePanel() {
		_classCallCheck(this, _HomePanel);

		_get(Object.getPrototypeOf(_HomePanel.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(HomePanel, [{
		key: 'render',

		//static propTypes = {};
		//static defaultProps = {};
		//state = {};

		//componentWillMount () {}
		//componentDidMount () {}
		//componentWillUnmount () {}
		//shouldComponentMount () { return true; }

		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'HomePanel' },
				'HomePanel'
			);
		}
	}]);

	var _HomePanel = HomePanel;
	HomePanel = _wrapComponent('_$HomePanel')(HomePanel) || HomePanel;
	return HomePanel;
})(_react2['default'].Component);

exports['default'] = HomePanel;
module.exports = exports['default'];