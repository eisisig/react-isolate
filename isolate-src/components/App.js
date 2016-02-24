'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';
import SplitPane from 'react-split-pane';

import Sidebar from './Sidebar';

const getInitialState = () => ({
	selectedComponent: null
});

const getDefaultProps = () => ({
	componentMap: null
});

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props: { componentMap }, setState }) => {

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
			<Sidebar componentMap={ componentMap } onSetComponent={ onSetComponent } />

			<SplitPane split="vertical" minSize="400" defaultSize="50%">

				{/* Left */}
				<SplitPane split="horizontal">
					<div><h1>Preview</h1></div>

					<SplitPane split="horizontal">
						<div><h1>Editor</h1></div>
						<div><h1>Markup</h1></div>
					</SplitPane>
				</SplitPane>

				{/* Right */}
				<SplitPane split="horizontal">
					<div><h1>Spec</h1></div>
					<div><h1>Docs</h1></div>
				</SplitPane>
			</SplitPane>
		</SplitPane>
	)
});

/**
 * Export
 */
export default stitch({ getInitialState, getDefaultProps, render });
