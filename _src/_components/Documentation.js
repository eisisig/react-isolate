'use strict';

import _ from 'lodash';
import React from 'react';

import PropList from './PropList';
import Docs from './Docs';

import ui from '../../_styles/ui.less';
import styles from '../../_styles/components/Documentation.less';

/**
 * # Documentation
 */
//import analyzeRender from '../_lib/analyzeRender';
//@analyzeRender
export default class Documentation extends React.Component {
	
	state = {
		filteredList: null,
		showProps: true,
		showState: true,
		showMarkup: true,
		showDocs: true,
		showDocumentationPanel: true
	};

	handleChangeLayout = ( prop, e ) => {
		const { onChange } = this.props;
		
		this.setState({
			[prop]: e.target.checked
		}, () => {
			if(onChange) {
				onChange(this.state);
			}
		});
	};

	render () {
		const { showProps, showDocs, showState, showMarkup } = this.state;
		const { currentData, children } = this.props;
		const showDocumentationPanel = showProps || showDocs;

		return (
			<div className={ styles.wrapper }>
				<div className={ styles.layouts }>
					<h3 className={ ui.header } style={{ "display": "inline-block"}} >Views</h3>
					<label className={ styles.layoutsLabel }><input onChange={ this.handleChangeLayout.bind(this, 'showDocs') } checked={ showDocs } className={ styles.layoutsInput } type="checkbox" /> Docs</label>
					<label className={ styles.layoutsLabel }><input onChange={ this.handleChangeLayout.bind(this, 'showProps') } checked={ showProps } className={ styles.layoutsInput } type="checkbox" /> Props</label>
					<label className={ styles.layoutsLabel }><input onChange={ this.handleChangeLayout.bind(this, 'showMarkup') } checked={ showMarkup } className={ styles.layoutsInput } type="checkbox" /> Markup</label>
					<label className={ styles.layoutsLabel }><input onChange={ this.handleChangeLayout.bind(this, 'showState') } checked={ showState } className={ styles.layoutsInput } type="checkbox" /> Props/State</label>
				</div>
				{ currentData.currentDocs && showDocumentationPanel ? (
					<div className={ styles.docs }>
						{ showProps ? <PropList { ...currentData } /> : null }
						{ currentData.currentComponent && currentData.currentComponent.docs && showDocs ? <Docs docs={ currentData.currentComponent.docs } /> : null }
					</div>
				) : null  }
				{ currentData.currentFixture ? (
					<div className={ showDocumentationPanel ? styles.previewWithDocs : styles.preview }>
						{ React.Children.map(children, ( el ) => React.cloneElement(el, { currentData, codeText: currentData.currentFixture.props, showMarkup, showState })) }
					</div>
				) : null }
			</div>
		);
	}
}
