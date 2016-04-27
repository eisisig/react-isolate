'use strict'

import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {stitch} from 'keo'
import {connect} from 'react-redux'

import isEmpty from 'lodash/isEmpty'

const mapStateToProps = state => ({
	selectedFixture: state.selectedFixture,
	selectedComponent: state.selectedComponent,
})

const propTypes = {
	selectedFixture: PropTypes.object,
	selectedComponent: PropTypes.func,
}

export const renderComponent = ({ selectedComponent, selectedFixture }) => {

	selectedFixture = selectedFixture && selectedFixture.props || selectedComponent.defaultProps || {}

	if ( selectedComponent ) {
		const container = document.getElementById('preview-container')

		ReactDOM.unmountComponentAtNode(container)

		if ( !selectedFixture && !selectedComponent ) {
			ReactDOM.render(<div></div>, container)
		} else {
			ReactDOM.render(React.createElement(selectedComponent, { ...selectedFixture }), container)
		}

	}

	// console.log('selectedFixture', selectedFixture)

	return null
}

const componentDidMount = ({ props }) => renderComponent(props)
const componentDidUpdate = ({ props }) => renderComponent(props)

const render = () => {
	return <div id="preview-container" className="PreviewComponent"></div>
}

export default connect(mapStateToProps)(stitch({ propTypes, componentDidMount, componentDidUpdate, render }))
