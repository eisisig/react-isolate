'use strict'

import React, {PropTypes} from 'react'
import {stitch} from 'keo'
import styleclasses from 'styleclasses'
import 'brace'
import 'brace/mode/javascript'
import 'brace/mode/json'
import 'brace/mode/jsx'
import 'brace/theme/github'
import {Editor, Markup, Panel, Preview, Sidebar, Spec, Topbar} from './index'

import styles from '../styles/App.less'

const mapStateToProps = state => ({
	viewState: state.viewState
})

const propTypes = {
	viewState: PropTypes.object
}

const render = ({ props }) => {

	const sx = styleclasses(styles)

	return (
		<div className={ sx('root') }>

			<div className={ sx('top') }>
				<Topbar />
			</div>

			<div className={ sx('bottom') }>

				<div className={ sx('sidebar') }>
					<Sidebar />
				</div>

				<div className={ sx('main') }>
					<If condition={ props.viewState.showPreview || props.viewState.showMarkup || props.viewState.showEditor }>

						<div className={ sx('left') }>
							<If condition={ props.viewState.showPreview }>
								<div className={ sx('preview', null, ['box']) }>
									<Panel title="Preview"><Preview /></Panel>
								</div>
							</If>
							<If condition={ props.viewState.showMarkup }>
								<div className={ sx('markup', null, ['box']) }>
									<Panel title="Markup"><Markup /></Panel>
								</div>
							</If>
							<If condition={ props.viewState.showEditor }>
								<div className={ sx('editor', null, ['box']) }>
									<Panel title="Editor"><Editor /></Panel>
								</div>
							</If>
						</div>

					</If>

					<If condition={ props.viewState.showSpec || props.viewState.showDoc }>

						<div className={ sx('right') }>
							<If condition={ props.viewState.showSpec }>
								<div className={ sx('spec', null, ['box']) }>
									<Panel title="Spec"><Spec /></Panel>
								</div>
							</If>
							<If condition={ props.viewState.showDoc }>
								<div className={ sx('doc', null, ['box']) }>
									<Panel title="Docs" />
								</div>
							</If>
						</div>

					</If>

				</div>
			</div>

		</div>
	)
}

export default stitch({ propTypes, render }, mapStateToProps)
