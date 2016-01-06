'use strict';

import React from 'react';

import SideBar from './SideBar';

import styles from '../../_styles/components/App.less';

/**
 * # App
 */
export default class App extends React.Component {

	state = {
		currentFixture: null,
		currentComponent: null,
		showDocs: true,
		showMarkup: true,
		showState: true,
		showProps: true
	};

	handleLayoutChange = ( layoutState ) => {
		this.setState({
			showDocs: layoutState.showDocs,
			showProps: layoutState.showProps,
			showMarkup: layoutState.showMarkup,
			showState: layoutState.showState
		});
	};

	render () {

		const { params, children, location, history, route: { appData } } = this.props;
		const { showState, showMarkup, showProps, showDocs } = this.state;

		const currentData = {
			currentDocs: null,
			currentFixture: null,
			currentComponent: null,
			showState: showState,
			showMarkup: showMarkup,
			showProps: showProps,
			showDocs: showDocs
		};

		const currentComponent = _.get(appData, [params.component, 'components', params.sub]);

		if ( currentComponent ) {
			currentData.currentComponent = currentComponent;
			try {
				currentData.currentDocs = require('!!docgen?markdownDescription!COMPONENTS_PATH/' + currentComponent.filePath.slice(2));

				if ( Array.isArray(currentData.currentDocs) ) {
					currentData.currentDocs = currentData.currentDocs[0];
				}
			} catch ( e ) {
				//console.log('App.requireDocs', e);
			}
		}

		const currentFixture = _.get(currentComponent, ['fixtures', params.fixture]);

		if ( currentComponent && currentFixture ) {
			currentData.currentFixture = currentFixture;
		}

		return (
			<div className={ styles.wrapper }>
				<div className={ styles.sidebar }>
					<SideBar components={ appData } location={ location } history={ history } currentData={ currentData } onChange={ this.handleLayoutChange } />
				</div>
				<div className={ styles.main }>
					{ React.Children.map(children, ( el ) => React.cloneElement(el, { currentData })) }
				</div>
			</div>
		);
	}
}
