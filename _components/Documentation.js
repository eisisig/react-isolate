'use strict';

import _ from 'lodash';
import React from 'react';

import PropList from './PropList';

import styles from '../_styles/components/Documentation.less';

/**
 * # Documentation
 */
//import analyzeRender from '../_lib/analyzeRender';
//@analyzeRender
export default class Documentation extends React.Component {
	render () {
		const { currentData, children } = this.props;
		return (
			<div className={ styles.wrapper }>

				<If condition={ currentData.currentDocs }>
					<div className={ styles.docs }>
						<PropList { ...currentData } />
					</div>
				</If>

				<If condition={ currentData.currentFixture }>
					<div className={ styles.preview }>
						{ React.Children.map(children, ( el ) => React.cloneElement(el, { currentData, codeText: currentData.currentFixture.props })) }
					</div>
				</If>
			</div>
		);
	}
}
