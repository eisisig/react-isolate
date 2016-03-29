'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';
import AceEditor from 'react-ace';
import serialize from 'serialize-javascript';
import stringify from 'node-stringify';

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props: { selectedFixture, onSetFixture } }) => {

	const handleChange = (value) => {
			onSetFixture(value);
		// try {
			// const toJS = JSON.parse(value);
		// } catch ( e ) {
		// 	console.log('JSON.parse error', e);
		// }
	};

	const value = stringify(selectedFixture);

	return (
		<If condition={ selectedFixture }>
			<AceEditor
				mode="javascript"
				name="preview"
				theme="github"
				width="100%"
				value={ value }
				showGutter={ true }
				showPrintMargin={ false }
				highlightActiveLine={ false }
				editorProps={{ $blockScrolling: true }}
				onChange={ handleChange } />
		</If>
	);
});

/**
 * Export
 */
export default stitch({ render });
