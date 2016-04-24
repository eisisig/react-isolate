'use strict'

import React, {PropTypes} from 'react'
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

/* ------------------------------------------------------------
 Should Component Update
 ----------------------------------------------------------- */
// const shouldComponentUpdate = ({ nextProps, props }) => !isEqual(nextProps, props)

/* ------------------------------------------------------------
 Render component
 ----------------------------------------------------------- */
export const renderComponent = (props) => {

	console.info('Preview: renderComponent', props)

	// if ( !selectedComponent ) return null
	// const { Component } = selectedComponent

	// const props = selectedFixture || {}

	// if ( typeof Component === 'function' ) {
	// 	console.log('props', props)
	// 	return React.cloneElement(<Component />, { ...props })
	// }
}

/* ------------------------------------------------------------
 Render
 ----------------------------------------------------------- */
const render = ({ props }) => {
	return <div className="PreviewComponent">{ renderComponent(props) }</div>
}

export default connect(mapStateToProps)(stitch({ propTypes, render }))
