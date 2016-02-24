'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';
import SplitPane from 'react-split-pane';

import Sidebar from './Sidebar';
import Markup from './Markup';
import PreviewComponent from './PreviewComponent';
import Panel from './UI';

const getInitialState = () => ({
	selectedComponent: null,
	selectedComponentFixtures: null,
	selectedFixture: null,
});

const getDefaultProps = () => ({
	componentMap: null
});

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props: { componentMap, appConfig }, state, setState }) => {

	console.log(JSON.stringify(state, null, 4));

	/**
	 * Handlers
	 * @param {object} component
	 */
	const onSetComponent = (component) => setState({
		selectedComponent: component
	});

	return (
		<SplitPane split="vertical" minSize="220" defaultSize="220">

			{/* Sidebar */}
			<Sidebar componentMap={ componentMap } appConfig={ appConfig } onSetComponent={ onSetComponent } />

			<SplitPane split="vertical" minSize="400" defaultSize="50%">

				{/* Left */}
				<SplitPane split="horizontal">

					{/* Preview */}
					<Panel title="Preview">
						<PreviewComponent component={ state.selectedComponent } />
					</Panel>

					<SplitPane split="horizontal">

						{/* Editor */}
						<Panel title="Editor">
							Editor
						</Panel>

						{/* Markup */}
						<Panel title="Markup">
							<Markup />
						</Panel>
					</SplitPane>
				</SplitPane>

				{/* Right */}
				<SplitPane split="horizontal">

					{/* Spec */}
					<Panel title="Spec">
						Spec
					</Panel>

					{/* Docs */}
					<Panel title="Docs">
						Docs
					</Panel>
				</SplitPane>
			</SplitPane>
		</SplitPane>
	)
});

/**
 * Export
 */
export default stitch({ getInitialState, getDefaultProps, render });
