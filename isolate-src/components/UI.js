'use strict'

import React, {PropTypes} from 'react'

export function PanelHeader ({ title }) {
	return <h1 className="Panel-header">{ title }</h1>
}

PanelHeader.propTypes = {
	value: PropTypes.string,
}

export function PanelBody ({ children }) {
	return <div className="Panel-body">{ children }</div>
}

PanelBody.propTypes = {
	children: PropTypes.element,
}

export function Panel ({ title, children }) {
	return (
		<div className="Panel">
			<PanelHeader title={ title } />
			<PanelBody>
				{ children }
			</PanelBody>
		</div>
	)
}

Panel.propTypes = {
	title: PropTypes.string,
	children: PropTypes.element,
}

export default Panel
