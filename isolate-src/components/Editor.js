'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';
import AceEditor from 'react-ace';
import beautify from 'js-beautify';

// function jsonSerialize (key, value) {
// 	if ( !key ) return value;
// 	if ( typeof value !== 'function' ) return value;
// 	try {
// 		return value.toString();
// 	} catch ( e ) {}
// };
//
// function jsonDeserialize (key, value) {
// 	debugger;
// 	if ( value && typeof value === 'string' && value.substr(0, 8) == 'function' ) {
// 		return new Function(`return ${value}`)();
// 	}
// 	return value;
// }

/**
 * Render
 */
const render = ({ props: { selectedFixture, onSetFixture } }) => {

	if ( !selectedFixture ) return null;

	const handleChange = (value) => {

		try {
			const toJS = JSON.parse(value);
			onSetFixture(toJS);
		} catch ( e ) {
			console.log('JSON.parse error', e);
		}
	};

	const value = beautify(JSON.stringify(selectedFixture));

	console.log('value', value);

	// const value = serialize(selectedFixture);

	return (
		<If condition={ selectedFixture }>
			<AceEditor
				mode="json"
				name="preview"
				theme="github"
				width="100%"
				value={ value }
				showGutter={ false }
				showPrintMargin={ false }
				highlightActiveLine={ false }
				editorProps={{ $blockScrolling: true }}
				onChange={ handleChange } />
		</If>
	);
};

/**
 * Export
 */
export default stitch({ render });
