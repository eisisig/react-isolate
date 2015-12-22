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

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _highlightJs = require('highlight.js');

var _highlightJs2 = _interopRequireDefault(_highlightJs);

var _htmlEntities = require('html-entities');

var _stylesUiLess = require('../../_styles/ui.less');

var _stylesUiLess2 = _interopRequireDefault(_stylesUiLess);

var _stylesComponentsDocsLess = require('../../_styles/components/Docs.less');

var _stylesComponentsDocsLess2 = _interopRequireDefault(_stylesComponentsDocsLess);

var _components = {
	_$Docs: {
		displayName: 'Docs'
	}
};

var _reactComponentWrapper = (0, _reactTransformHmr3['default'])({
	filename: '_src/_components/Docs.js',
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

var entities = new _htmlEntities.AllHtmlEntities();

_marked2['default'].setOptions({
	renderer: new _marked2['default'].Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
});

/**
 * # Docs
 */

var Docs = (function (_React$Component) {
	_inherits(Docs, _React$Component);

	function Docs() {
		_classCallCheck(this, _Docs);

		_get(Object.getPrototypeOf(_Docs.prototype), 'constructor', this).apply(this, arguments);

		this.highlightSyntax = function () {
			var codeBlocks = document.getElementsByTagName('code');
			if (codeBlocks) {
				_lodash2['default'].forEach(codeBlocks, function (block) {
					_highlightJs2['default'].highlightBlock(block);
				});
			}
		};
	}

	_createClass(Docs, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.highlightSyntax();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.highlightSyntax();
		}
	}, {
		key: 'render',
		value: function render() {
			var docs = this.props.docs;

			var keys = Object.keys(docs);

			if (!keys.length) return null;

			var parsedDocs = [];

			keys.forEach(function (key) {
				var doc = docs[key];
				var requiredDoc = require('COMPONENTS_PATH/' + doc.filePath.slice(2));
				var parsedDoc = entities.decode((0, _marked2['default'])(requiredDoc));
				if (parsedDoc) {
					parsedDocs.push(parsedDoc);
				}
			});

			return _react2['default'].createElement(
				'div',
				{ className: _stylesComponentsDocsLess2['default'].wrapper },
				_react2['default'].createElement(
					'h3',
					{ className: _stylesUiLess2['default'].header },
					'Docs'
				),
				parsedDocs.length ? parsedDocs.map(function (doc, i) {
					return _react2['default'].createElement('div', { key: i, className: _stylesComponentsDocsLess2['default'].doc, dangerouslySetInnerHTML: { __html: doc } });
				}) : null
			);
		}
	}]);

	var _Docs = Docs;
	Docs = _wrapComponent('_$Docs')(Docs) || Docs;
	return Docs;
})(_react2['default'].Component);

exports['default'] = Docs;

function decodeHtml(html) {
	var txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
}
module.exports = exports['default'];