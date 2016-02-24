'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';
import get from 'lodash.get';
import SplitPane from 'react-split-pane';

import Sidebar from './Sidebar';
import Markup from './Markup';
import Preview from './Preview';
import Editor from './Editor';
import Panel from './UI';

const getInitialState = () => ({
	selectedComponent: null,
	selectedFixture: null
});

const getDefaultProps = () => ({
	componentMap: null
});

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props: { componentMap, appConfig }, state, setState }) => {

	/* Handlers
	 ------------------------------------------------------------ */
	const onSetComponent = (component, fixture = null) => setState({
		selectedComponent: component,
		selectedFixture: fixture || get(component, 'fixtures.defaultProps') || null
	});

	/* Return
	 ------------------------------------------------------------ */
	return (
		<SplitPane split="vertical" minSize="220" defaultSize="220">

			{/* Sidebar */}
			<Sidebar componentMap={ componentMap } appConfig={ appConfig } onSetComponent={ onSetComponent } />

			<SplitPane split="vertical" minSize="400" defaultSize="50%">

				{/* Left */}
				<SplitPane split="horizontal">

					{/* Preview */}
					<Panel title="Preview">
						<Preview { ...state } />
					</Panel>

					<SplitPane split="horizontal">

						{/* Editor */}
						<Panel title="Editor">
							<Editor { ...state } />
						</Panel>

						{/* Markup */}
						<Panel title="Markup">
							<Markup { ...state } />
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
