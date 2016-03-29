'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props, state, setState }) => {
	return (
		<div className="Topbar">
			<span className="Topbar-logo">{ __ISOLATE__.title }</span>
			<span className="Topbar-toggles">
				<span>Show:</span>
				<label><input type="checkbox" value="preview" />Preview</label>
				<label><input type="checkbox" value="editor" />Editor</label>
				<label><input type="checkbox" value="markup" />Markup</label>
				<label><input type="checkbox" value="spec" />Spec</label>
				<label><input type="checkbox" value="docs" />Docs</label>
			</span>
		</div>
	)
});

/**
 * Export
 */
export default stitch({ render });
