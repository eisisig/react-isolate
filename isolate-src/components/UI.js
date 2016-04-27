'use strict'

import React, {PropTypes} from 'react'

import styles from '../styles/UI.less'

export function PanelHeader ({ title }) {
	return <div className={ styles.header }>{ title }</div>
}

PanelHeader.propTypes = {
	title: PropTypes.string,
}

export function PanelBody ({ children }) {
	return <div className={ styles.body }>{ children }</div>
}

PanelBody.propTypes = {
	children: PropTypes.element,
}

export function Panel ({ title, children }) {
	return (
		<div className={ styles.root }>
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
