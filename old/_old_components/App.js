'use strict';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import SideBar from './SideBar';

import styles from '../../_styles/components/App.less';

/**
 * # App
 */
export default class App extends PureComponent {

	state = {
		currentFixture: null,
		currentComponent: null
	};

	render () {

		const { params, children, location, history, route: { appData } } = this.props;

		const currentData = {
			currentDocs: null,
			currentFixture: null,
			currentComponent: null
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
					<SideBar components={ appData } location={ location } history={ history } currentData={ currentData } />
				</div>
				<div className={ styles.main }>
					{ React.Children.map(children, ( el ) => React.cloneElement(el, { currentData })) }
				</div>
			</div>
		);
	}
}
