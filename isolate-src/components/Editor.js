'use strict'

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {stitch} from 'keo'
import get from 'lodash/get'
import ace from 'brace';
// import beautify from 'js-beautify'
import {setFixture} from '../actions'

const displayName = 'Editor'

const mapStateToProps = state => ({
	selectedFixture: get(state, 'selectedFixture.props'),
	selectedComponent: state.selectedComponent,
})

const propTypes = {
	selectedFixture: PropTypes.object,
	selectedComponent: PropTypes.func,
}

const shouldComponentUpdate = ({ props, nextProps }) => {
	// console.log('props', props.selectedFixture)
	// console.log('nextProps', nextProps.selectedFixture)
	// console.log(JSON.stringify(props.selectedFixture) !== JSON.stringify(nextProps.selectedFixture))
	return JSON.stringify(props.selectedFixture) !== JSON.stringify(nextProps.selectedFixture)
}

const serializeValue = value => JSON.stringify(value)
const deserializeValue = value => JSON.parse(value)
// let editor = null

const handleChange = ({ dispatch }) => {
	const value = editor.getValue()
	console.info('handleChange.value', value)
	try {
		const toJS = deserializeValue(value)
		console.log('handleChange.toJS', toJS)
		dispatch(setFixture(toJS))
	} catch ( e ) {
		console.warn('JSON.parse error', e)
	}
}

const initEditor = (element, { props }) => {

	console.debug('initEditor')

	const mode = 'json'
	const theme = 'github'
	const cursorStart = 1

	editor = ace.edit(element)
	editor.$blockScrolling = Infinity

	// var pos = editor.session.selection.toJSON()
	// editor.session.setValue("\n\n" + editor.session.getValue())
	// editor.session.selection.fromJSON(pos)

	editor.getSession().setMode(`ace/mode/${mode}`)
	editor.setTheme(`ace/theme/${theme}`)

	const value = serializeValue(props.selectedFixture)

	console.log('initEditor.value', value)

	editor.setValue(value, cursorStart)
	editor.on('change', handleChange.bind(null, props))
}

const render = ({ props, args }) => {

	return null

	if ( !props.selectedFixture ) return null

	const style = {
		width: '100%',
		height: '350px',
		border: '1px solid red',
	}

	return <div style={ style } ref={ (element) => initEditor(element, args) }></div>

	// return (
	// 	<If condition={ props.selectedFixture }>
	// 		<AceEditor
	// 			enableLiveAutocompletion
	// 			mode="json"
	// 			name="preview"
	// 			theme="github"
	// 			width="100%"
	// 			value={ value }
	// 			showGutter={ false }
	// 			showPrintMargin={ false }
	// 			highlightActiveLine={ false }
	// 			editorProps={{ $blockScrolling: true }}
	// 			onChange={ handleChange } />
	// 	</If>
	// )
}

export default stitch({ displayName, propTypes, shouldComponentUpdate, render }, mapStateToProps)
