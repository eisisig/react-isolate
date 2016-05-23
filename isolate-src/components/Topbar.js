'use strict'

import React, {PropTypes} from 'react'
import styleclasses from 'styleclasses'
import {stitch} from 'keo'
import {connect} from 'react-redux'
import {navigate, setViewState} from '../actions'

import styles from '../styles/Topbar.less'

const displayName = 'Topbar'

const mapStateToProps = state => ({
	viewState: state.viewState
})

const propTypes = {
	viewState: PropTypes.object
}

const render = ({ props }) => {

	const sx = styleclasses(styles)

	const handleChange = (e) => {
		props.dispatch(setViewState({ [e.target.name]: e.target.checked }))
	}

	return (
		<div className={ sx('root') }>
			<div className={ sx('title') }>
				<a className={ sx('titleLink') } onClick={ () => props.dispatch(navigate('/')) }>{ __ISOLATE__.title }</a>
			</div>
			<div className={ sx('actions') }>
				<div className={ sx('toggles') }>
					<span className={ sx('togglesLegend' ) }>Show:</span>
					<span className={ sx('sep') }>|</span>
					<label className={ sx('label', { inactive: !props.viewState.showPreview }) }>
						<input type="checkbox" name="showPreview" defaultChecked={ props.viewState.showPreview } onChange={ handleChange } />
						Preview
					</label>
					<label className={ sx('label', { inactive: !props.viewState.showMarkup }) }>
						<input type="checkbox" name="showMarkup" defaultChecked={ props.viewState.showMarkup } onChange={ handleChange } />
						Markup
					</label>
					<label className={ sx('label', { inactive: !props.viewState.showEditor }) }>
						<input type="checkbox" name="showEditor" defaultChecked={ props.viewState.showEditor } onChange={ handleChange } />
						Editor
					</label>
					<span className={ sx('sep') }>|</span>
					<label className={ sx('label', { inactive: !props.viewState.showSpec }) }>
						<input type="checkbox" name="showSpec" defaultChecked={ props.viewState.showSpec } onChange={ handleChange } />
						Spec
					</label>
					<label className={ sx('label', { inactive: !props.viewState.showDoc }) }>
						<input disabled type="checkbox" name="showDoc" defaultChecked={ props.viewState.showDoc } onChange={ handleChange } />
						Docs
					</label>
				</div>
			</div>
		</div>
	)
}

/**
 * Export
 */
export default stitch({ displayName, propTypes, render }, mapStateToProps)
