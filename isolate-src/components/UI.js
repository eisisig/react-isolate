'use strict';

import React, {PropTypes} from 'react';

export function PanelHeader ({ value }) {
	return <h1 className="Panel-header">{ value }</h1>;
}

export function PanelBody ({ children }) {
	return <div className="Panel-body">{ children }</div>;
}

export function Panel ({ title, children }) {
	return (
		<div className="Panel">
			<PanelHeader value={ title } />
			<PanelBody>
				{ children }
			</PanelBody>
		</div>
	);
}
export default Panel;
