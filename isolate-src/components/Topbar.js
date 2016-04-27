'use strict'

import React, {PropTypes} from 'react'
import {stitch} from 'keo'
import {connect} from 'react-redux'
import {navigate, setViewState} from '../actions'

const mapStateToProps = state => ({
	viewState: state.viewState
})

const propTypes = {
	viewState: PropTypes.object
}

const render = ({ props }) => {

	const handleChange = (e) => {
		props.dispatch(setViewState({ [e.target.name]: e.target.checked }))
	}

	return (
		<div className="Topbar">
			<span className="Topbar-logo">
				<a onClick={ () => props.dispatch(navigate('/')) }>{ __ISOLATE__.title }</a>
			</span>
			<span className="Topbar-toggles">
				<span>Show:</span>
				<label><input type="checkbox" name="showPreview" defaultChecked={ props.viewState.showPreview } onChange={ handleChange } />Preview</label>
				<label><input type="checkbox" name="showMarkup" defaultChecked={ props.viewState.showMarkup } onChange={ handleChange } />Markup</label>
				<label><input type="checkbox" name="showEditor" defaultChecked={ props.viewState.showEditor } onChange={ handleChange } />Editor</label>
				<label><input type="checkbox" name="showSpec" defaultChecked={ props.viewState.showSpec } onChange={ handleChange } />Spec</label>
				<label><input type="checkbox" name="showDoc" defaultChecked={ props.viewState.showDoc } onChange={ handleChange } />Docs</label>
			</span>
		</div>
	)
}

/**
 * Export
 */
export default connect(mapStateToProps)(stitch({ propTypes, render }))
