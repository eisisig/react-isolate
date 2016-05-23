'use strict'

import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import get from 'lodash/get'
import {stitch} from 'keo'
import {connect} from 'react-redux'

const displayName = 'Preview'

const mapStateToProps = state => ({
	selectedFixture: state.selectedFixture,
	selectedComponent: state.selectedComponent,
})

const propTypes = {
	selectedFixture: PropTypes.object,
	selectedComponent: PropTypes.func,
}

export const renderComponent = ( { selectedComponent, selectedFixture } ) => {

	if ( !selectedComponent ) {
		return null
	}

	if ( !selectedFixture && selectedComponent.hasOwnProperty('defaultProps') ) {
		selectedFixture = selectedComponent.defaultProps
	}

	const container = document.getElementById('preview-container')

	ReactDOM.unmountComponentAtNode(container)

	try {
		ReactDOM.render(React.createElement(selectedComponent, { ...selectedFixture }), container)
	} catch ( e ) {
		console.log('e1', e)
		return null
	}
}

// const componentDidMount = ( { props } ) => renderComponent(props)
// const componentDidUpdate = ( { props } ) => {
// 	console.log('Preview: componentDidUpdate')
// 	renderComponent(props)
// }

const render = ( { props: { selectedComponent, selectedFixture } } ) => {
	console.log('Preview: render')
	return (
		<div id="preview-container" className="PreviewComponent">
		     { React.createElement(selectedComponent, { ...selectedFixture }) }
		</div>
	)
}

export default stitch({ displayName, propTypes, render }, mapStateToProps)
