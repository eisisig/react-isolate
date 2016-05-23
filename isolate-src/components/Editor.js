'use strict'

import React, {PropTypes} from 'react'
import {stitch} from 'keo'
import get from 'lodash/get'
// import ace from 'brace';
import AceEditor from 'react-ace'
import {setFixture} from '../actions'

const displayName = 'Editor'

const mapStateToProps = state => ({
	selectedFixture: get(state, 'selectedFixture'),
	selectedComponent: state.selectedComponent,
})

const propTypes = {
	selectedFixture: PropTypes.object,
	selectedComponent: PropTypes.func,
}

const shouldComponentUpdate = ( { props, nextProps } ) => {
	return JSON.stringify(props.selectedFixture) !== JSON.stringify(nextProps.selectedFixture)
}

const render = ( { props } ) => {

	if ( !props.selectedFixture ) return null

	const handleChange = ( value ) => {
		// console.info('handleChange.value', value)
		try {
			const toJS = deserializeValue(value)
			console.log('handleChange.toJS', toJS)
			props.dispatch(setFixture(toJS))
		} catch ( e ) {
			console.warn('JSON.parse error', e)
		}
	}

	const value = JSON.stringify(props.selectedFixture, null, 4)

	const Editor = (
		<AceEditor
			enableLiveAutocompletion
			mode="json"
			name="preview"
			theme="github"
			width="100%"
			value={ value }
			showGutter={ false }
			showPrintMargin={ false }
			highlightActiveLine={ false }
			editorProps={{ $blockScrolling: true }}
			onChange={ handleChange } />
	)

	return (
		<If condition={ props.selectedFixture }>
		    { Editor }
		</If>
	)
}

export default stitch({ displayName, propTypes, shouldComponentUpdate, render }, mapStateToProps)
