'use strict'

import React, {PropTypes} from 'react'
import {stitch} from 'keo'
import {connect} from 'react-redux'
import isEqual from 'lodash.isequal'

const mapStateToProps = state => ({
	selectedComponent: state.selectedComponent,
})

const propTypes = {
	selectedComponent: PropTypes.object
}

/* ------------------------------------------------------------
 Should Component Update
 ----------------------------------------------------------- */
const shouldComponentUpdate = ({ nextProps, props }) => !isEqual(nextProps, props)

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

export default connect(mapStateToProps)(stitch({ propTypes, shouldComponentUpdate, render }))