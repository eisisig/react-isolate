'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';
import get from 'lodash.get';
import SplitPane from 'react-split-pane';
import {createHistory, useBasename} from 'history';
import ace from 'brace';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/jsx';
import 'brace/theme/github';

import findComponents from '../utils/findCompoennts';
import {Editor, Markup, Panel, Preview, Sidebar, Spec, Topbar} from './index';

const history = useBasename(createHistory)({ basename: '/' });

/* ------------------------------------------------------------
 React
 ----------------------------------------------------------- */
const getInitialState = () => ({
	visiblePanels: {
		docs: true,
		spec: true,
		editor: false,
		markup: false,
		preview: false
	},
	searchResults: null,
	selectedFixture: null,
	selectedComponent: null
});

const getDefaultProps = () => ({
	componentMap: null
});

/* ------------------------------------------------------------
 Methods
 ----------------------------------------------------------- */
export const setComponent = (component, fixture) => {
	// TODO: Work urls
	return {
		selectedComponent: component,
		selectedFixture: fixture || get(component, 'fixtures.defaultProps') || null
	};
};

export const setFixture = (fixture) => {

	// fixture = JSON.parse(fixture, (key, val) => {
	// 	console.log('val', val);
	// });

	// console.log('fixture', fixture);

	return {
		selectedFixture: fixture
	};
};

export const clearSearch = () => ({ searchResults: null });

export const search = (query, components, setState, clear) => query ? setState({ searchResults: findComponents(query, components) }) : clear();

const setUrl = (path, query, components, onSetComponent) => {

	history.push({
		pathname: path,
		search: query ? path.format({ query: query }) : null
	});

	let pathArr = path.split('/').slice(1);
	let fixturePath, selectedFixtures;

	const fixtureIndex = pathArr.indexOf('fixtures');

	if ( ~fixtureIndex ) { fixturePath = pathArr.splice(fixtureIndex, 2); }

	const selectedComponent = get(components, pathArr);

	if ( selectedComponent ) { selectedFixtures = get(selectedComponent, fixturePath); }

	onSetComponent(selectedComponent, selectedFixtures);
};

const componentDidMount = () => {
	console.log(': componentDidMount');
};

/* ------------------------------------------------------------
 Render
 ----------------------------------------------------------- */
const render = pipe(resolutionMap, ({ props, state, setState }) => {

	/* ------------------------------------------------------------
	 Handlers
	 ----------------------------------------------------------- */
	// const showPanel = (name) => !!state.visiblePanels[name];
	const onSearchClear = () => setState(clearSearch());
	const onSetFixture = (fixture) => setState(setFixture(fixture));
	const onSetComponent = (component, fixture = null) => setState(setComponent(component, fixture));
	const onSearch = (e) => search(e.currentTarget.value, props.componentMap, setState, onSearchClear);
	const onSetUrl = (url, query) => setUrl(url, query, props.componentMap, onSetComponent);

	/* ------------------------------------------------------------
	 Return
	 ----------------------------------------------------------- */
	return (
		<div>

			<Topbar />

			<SplitPane split="vertical" minSize="220" defaultSize="220">

				<Sidebar
					componentMap={ state.searchResults || props.componentMap }
					appConfig={ props.appConfig }
					onSearch={ onSearch }
					onSetUrl={ onSetUrl }
					onSearchClear={ onSearchClear }
					onSetComponent={ onSetComponent }
					onSetFixture={ onSetFixture } />

				<SplitPane split="vertical" minSize="400" defaultSize="50%">

					<SplitPane split="horizontal">
						<Panel title="Preview"><Preview { ...state } /></Panel>
						<SplitPane split="horizontal">
							<Panel title="Editor"><Editor { ...state } onSetFixture={ onSetFixture } /></Panel>
							<Panel title="Markup"><Markup { ...state } /></Panel>
						</SplitPane>
					</SplitPane>

					<SplitPane split="horizontal">
						<Panel title="Spec"><Spec { ...state } /></Panel>
						<Panel title="Docs" />
					</SplitPane>

				</SplitPane>

			</SplitPane>

		</div>
	)
});

export default stitch({ getInitialState, getDefaultProps, componentDidMount, render });

