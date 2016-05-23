'use strict'

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import get from 'lodash/get'
import {stitch} from 'keo'
import renderMarkup from '../utils/renderMarkup'
import AceEditor from 'react-ace'

const displayName = 'Markup'

const mapStateToProps = state => ({
	selectedFixture: state.selectedFixture,
	selectedComponent: state.selectedComponent,
})

const propTypes = {
	selectedFixture: PropTypes.object,
	selectedComponent: PropTypes.func,
}

const render = ( { props } ) => {

	const currentFixturePath = get(props, 'selectedFixture.path')

	if ( !currentFixturePath ) {
		return null
	}

	let fixture

	try {
		fixture = require('COMPONENTS_PATH/' + props.selectedFixture.path.slice(2))
		if ( fixture.hasOwnProperty('default') ) {
			fixture = fixture.default
		}
	} catch ( e ) {
		console.log('e', e)
		return null
	}

	return (
		<code>
			<If condition={ props.selectedComponent }>
				<AceEditor
					mode="jsx"
					name="markup"
					theme="github"
					width="100%"
					value={ renderMarkup(props.selectedComponent.name, fixture, true) }
					readOnly={ true }
					displayIndentGuides={ true }
					showGutter={ false }
					showPrintMargin={ false }
					editorProps={{ $blockScrolling: true }}
					highlightActiveLine={ false } />
			</If>
		</code>
	)
}

export default stitch({ displayName, propTypes, render }, mapStateToProps)
