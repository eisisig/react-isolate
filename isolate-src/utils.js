'use strict';

import omit from 'lodash/omit';

export const removeExtension = (subject, ext = '.js') => {
	return ( Array.isArray(subject) )
		? subject.map((part) => part.replace(ext, ''))
		: subject.replace(ext, '');
};

export const renderComponentMarkup = (componentName, props, multiLine = false) => {

	if ( typeof props === 'string' ) {
		props = JSON.parse(props);
	}

	const start = `<${componentName}`;

	// Remove state
	props = omit(props, 'state');

	const propList = Object.keys(props).map((key) => {

		let value = props[key];

		if ( value && value !== true && typeof value !== 'object' && typeof value !== 'function' && typeof value !== 'number' ) {
			value = value.trim();
		}

		key = key.trim();

		//if ( typeof value === 'function' ) {}

		let prop;

		if ( typeof value === 'object' ) {
			prop = `${key}={ ${JSON.stringify(value)} }`;
		}
		else if ( value === false || typeof value === 'number' ) {
			prop = `${key}={ ${value} }`;
		} else if ( value === true ) {
			prop = key;
		} else if ( value !== null && value !== undefined ) {
			prop = `${key}="${value}"`;
		}

		return multiLine ? `\n\t${prop}` : prop;

	}).join(' ');

	const end = `/>`;

	return `${start} ${propList} ${end}`;
};
