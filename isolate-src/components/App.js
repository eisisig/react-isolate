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
			<Sidebar componentMap={ componentMap } onSetComponent={ onSetComponent } />
			<SplitPane split="vertical" minSize="500" defaultSize="50%">
				<SplitPane split="horizontal">
					<div>1.1</div>
					<div>1.2</div>
				</SplitPane>
				<SplitPane split="horizontal">
					<div>2.1</div>
					<div>2.2</div>
				</SplitPane>
			</SplitPane>
		</SplitPane>
	)
});

/**
 * Export
 */
export default stitch({ getInitialState, getDefaultProps, render });
