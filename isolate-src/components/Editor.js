'use strict'

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {stitch} from 'keo'
import AceEditor from 'react-ace'
import beautify from 'js-beautify'

/**
 * map state to props
 * @param {object} state
 */
const mapStateToProps = state => ({
	selectedFixture: state.selectedFixture,
	selectedComponent: state.selectedComponent,
})

/**
 * validate props
 * @type {{selectedFixture: object, selectedComponent: object}}
 */
const propTypes = {
	selectedFixture: PropTypes.object,
	selectedComponent: PropTypes.object,
}

/**
 * render component
 * @param {object} props
 * @returns {XML}
 */
const render = ({ props }) => {

	return null

	if ( !props.selectedFixture ) return null

	const handleChange = (value) => {

		try {
			const toJS = JSON.parse(value)
			onSetFixture(toJS)
		} catch ( e ) {
			console.log('JSON.parse error', e)
		}
	}

	const value = beautify(JSON.stringify(props.selectedFixture))

	return (
		<If condition={ props.selectedFixture }>
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
		</If>
	)
}

export default connect(mapStateToProps)(stitch({ propTypes, render }))
