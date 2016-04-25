'use strict'

import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {stitch} from 'keo'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
	selectedFixture: state.selectedFixture,
	selectedComponent: state.selectedComponent,
})

const propTypes = {
	selectedFixture: PropTypes.object,
	selectedComponent: PropTypes.object,
}

export const renderComponent = ({ selectedFixture, selectedComponent }) => {

	const container = document.getElementById('preview-container')

	ReactDOM.unmountComponentAtNode(container)

	if ( !selectedFixture && !selectedComponent ) {
		ReactDOM.render(<div></div>, container)
	} else {
		ReactDOM.render(React.createElement(selectedComponent.Component, { ...selectedFixture }), container)
	}
}

const componentDidMount = ({ props }) => renderComponent(props)
const componentDidUpdate = ({ props }) => renderComponent(props)

const render = () => {
	return <div id="preview-container" className="PreviewComponent"></div>
}

export default connect(mapStateToProps)(stitch({ propTypes, componentDidMount, componentDidUpdate, render }))
