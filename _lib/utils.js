'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var removeExtension = function removeExtension(subject) {
	var ext = arguments.length <= 1 || arguments[1] === undefined ? '.js' : arguments[1];

	return Array.isArray(subject) ? subject.map(function (part) {
		return part.replace(ext, '');
	}) : subject.replace(ext, '');
};

exports.removeExtension = removeExtension;
var renderComponentMarkup = function renderComponentMarkup(componentName, props) {
	var multiLine = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	if (typeof props === 'string') {
		props = JSON.parse(props);
	}

	var start = '<' + componentName;

	// Remove state
	props = _.omit(props, 'state');

	var propList = Object.keys(props).map(function (key) {

		var value = props[key];

		if (value && value !== true && typeof value !== 'object' && typeof value !== 'function' && typeof value !== 'number') {
			value = value.trim();
		}

		key = key.trim();

		//if ( typeof value === 'function' ) {}

		var prop = undefined;

		if (typeof value === 'object') {
			prop = key + '={ ' + JSON.stringify(value) + ' }';
		} else if (value === false || typeof value === 'number') {
			prop = key + '={ ' + value + ' }';
		} else if (value === true) {
			prop = key;
		} else if (value !== null && value !== undefined) {
			prop = key + '="' + value + '"';
		}

		return multiLine ? '\n\t' + prop : prop;
	}).join(' ');

	var end = '/>';

	return start + ' ' + propList + ' ' + end;
};
exports.renderComponentMarkup = renderComponentMarkup;