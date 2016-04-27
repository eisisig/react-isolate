'use strict'

import React, {PropTypes} from 'react'
import {stitch} from 'keo'
import {connect} from 'react-redux'
import 'brace'
import 'brace/mode/javascript'
import 'brace/mode/json'
import 'brace/mode/jsx'
import 'brace/theme/github'
import {Editor, Markup, Panel, Preview, Sidebar, Spec, Topbar} from './index'

import styles from './App.css'

const mapStateToProps = state => ({
	viewState: state.viewState
})

const propTypes = {
	viewState: PropTypes.object
}

const render = ({ props }) => {

	console.log('props.viewState.showPreview', props.viewState.showPreview)

	return (
		<div className={ styles.root }>

			<div className={ styles.top }>
				<Topbar />
			</div>

			<div className={ styles.bottom }>
				<div className={ styles.sidebar }>Sidebar</div>
				<div className={ styles.main }>

					<If condition={ props.viewState.showPreview || props.viewState.showMarkup || props.viewState.showEditor }>

						<div className={ styles.left }>
							<If condition={ props.viewState.showPreview }>
								<div className={ styles.preview }>preview</div>
							</If>
							<If condition={ props.viewState.showMarkup }>
								<div className={ styles.markup }>markup</div>
							</If>
							<If condition={ props.viewState.showEditor }>
								<div className={ styles.editor }>editor</div>
							</If>
						</div>

					</If>

					<If condition={ props.viewState.showSpec || props.viewState.showDoc }>

						<div className={ styles.right }>
							<If condition={ props.viewState.showSpec }>
								<div className={ styles.spec }>spec</div>
							</If>
							<If condition={ props.viewState.showDoc }>
								<div className={ styles.doc }>doc</div>
							</If>
						</div>

					</If>

				</div>
			</div>


			{/*

			 <Sidebar />
			 <Panel title="Preview"><Preview /></Panel>
			 <Panel title="Editor"><Editor /></Panel>
			 <Panel title="Markup"><Markup /></Panel>
			 <Panel title="Markup"><Markup /></Panel>
			 <Panel title="Spec"><Spec /></Panel>
			 <Panel title="Docs" />
			 */}
		</div>
	)
}

export default connect(mapStateToProps)(stitch({ propTypes, render }))
