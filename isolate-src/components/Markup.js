'use strict'

import React, {PropTypes} from 'react'
import {stitch} from 'keo'
import renderMarkup from '../utils/renderMarkup'
import AceEditor from 'react-ace'

/**
 * Render
 */
const render = ({ props }) => {
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

/**
 * Export
 */
export default stitch({ render })
