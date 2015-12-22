'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _babelCoreLibApiBrowser = require('babel-core/lib/api/browser');

var _babelCoreLibApiBrowser2 = _interopRequireDefault(_babelCoreLibApiBrowser);

var _yargs = require('yargs');

var _esprima = require('esprima');

var _esprima2 = _interopRequireDefault(_esprima);

var isolateDefaultConfig = require(_path2['default'].resolve(__dirname, '..', 'isolate.config.js'));

var isolateCustomConfig = {};

try {
	isolateCustomConfig = require(_path2['default'].resolve(process.cwd(), 'isolate.config.js'));
} catch (e) {
	//console.log('No custom isolate.config.js found');
}

var isolateConfig = _lodash2['default'].merge({}, isolateDefaultConfig, isolateCustomConfig);

var tests = _glob2['default'].sync(_path2['default'].resolve(process.cwd(), _yargs.argv.testsPath || isolateConfig.testsPath, '**/*.js'));

var testMap = tests.reduce(function (results, fileName) {

	var parts = fileName.split('/');
	var index = parts.indexOf('tests');
	var componentName = parts.slice(index + 1)[0];

	// TODO: Remove this custom check
	if (componentName === 'format' || componentName === 'dom.js') {
		return results;
	}

	console.log('componentName', componentName);

	try {
		var test = _fs2['default'].readFileSync(fileName, 'utf8');
		var testData = parseFile(test);

		return _lodash2['default'].merge(results, _defineProperty({}, componentName, {
			tests: {
				fileName: fileName,
				asserts: testData
			}
		}), function (a, b) {
			if (Array.isArray(a)) {
				return a.concat(b);
			}
		});
	} catch (e) {
		console.log('e', e);
		return results;
	}
}, {});

function parseFile(file) {

	var results = [];

	var transformed = _babelCoreLibApiBrowser2['default'].transform(file);

	var tree = _esprima2['default'].parse(transformed, {
		tolerant: true
	});

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = tree.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var branch = _step.value;

			console.log('branch', branch);
			if (branch.type === 'ExpressionStatement' && branch.expression.type === 'CallExpression') {
				var subBranch = branch.expression['arguments'];
				console.log('subBranch', subBranch);
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = subBranch[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var line = _step2.value;

						if (line.type === 'FunctionExpression') {
							var _iteratorNormalCompletion3 = true;
							var _didIteratorError3 = false;
							var _iteratorError3 = undefined;

							try {
								for (var _iterator3 = line.body.body[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
									var test = _step3.value;

									results.push(test.expression['arguments'][0].value);
								}
							} catch (err) {
								_didIteratorError3 = true;
								_iteratorError3 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion3 && _iterator3['return']) {
										_iterator3['return']();
									}
								} finally {
									if (_didIteratorError3) {
										throw _iteratorError3;
									}
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2['return']) {
							_iterator2['return']();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator['return']) {
				_iterator['return']();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return results;
}

exports['default'] = testMap;
module.exports = exports['default'];