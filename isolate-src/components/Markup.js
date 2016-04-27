'use strict'

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {stitch} from 'keo'
import renderMarkup from '../utils/renderMarkup'
import AceEditor from 'react-ace'

const mapStateToProps = state => ({
	selectedFixture: state.selectedFixture,
	selectedComponent: state.selectedComponent,
})

const propTypes = {
	selectedFixture: PropTypes.object,
	selectedComponent: PropTypes.object,
}

const render = ({ props }) => {

	return null
	return (
		<code>
			<If condition={ props.selectedComponent && props.selectedFixture }>
				<AceEditor
					mode="jsx"
					name="markup"
					theme="github"
					width="100%"
					value={ renderMarkup(props.selectedComponent.name, props.selectedFixture) }
					readOnly={ true }
					showGutter={ false }
					showPrintMargin={ false }
					editorProps={{ $blockScrolling: true }}
					highlightActiveLine={ false } />
			</If>
		</code>
	)
}

export default connect(mapStateToProps)(stitch({ propTypes, render }))
