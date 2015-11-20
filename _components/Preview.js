'use strict';

import _ from 'lodash';
import ReactDOM from 'react-dom';
import React, { PropTypes } from 'react';
import { renderComponentMarkup } from '../_lib/utils';

import Editor from './Editor';
import Markup from './Markup';

import styles from '../_styles/components/Preview.less';
import ui from '../_styles/ui.less';

/**
 * # PreviewPanel
 */
//import analyzeRender from '../_lib/analyzeRender';
//@analyzeRender
export default class Preview extends React.Component {

	static contextTypes = {
		router: PropTypes.object
	};

	state = {
		code: this.props.codeText
	};

	componentDidMount () {
		this.handlePreviewRender();
		this.handleEditorRender();
	}

	componentDidUpdate ( nextProps ) {
		const currentName = this.props.currentData.currentFixture.name;
		const nextName = nextProps.currentData.currentFixture.name;
		if ( !_.isEqual(currentName, nextName) ) {
			this.handleEditorRender();
		}
	}

	componentWillReceiveProps ( { codeText } ) {
		if ( !_.isEqual(this.state.code, codeText) ) {
			this.handleCodeChange(JSON.stringify(codeText));
		}
	}

	handleCodeChange = ( code ) => {
		try {
			code = JSON.parse(code);
			this.setState({ code }, () => {
				this.handlePreviewRender();
				//this.handleEditorRender();
			});
		} catch ( e ) {
			//console.log('e', e);
		}
	};

	DOMNode = () => {
		const { currentData: { currentComponent } } = this.props;
		let code = this.state.code;

		const Component = currentComponent.Component;

		try {
			return React.createElement(Component, { ...code });
		} catch ( e ) {
			console.log('e', e);
			return <div>ERROR in props: { e.message }</div>;
		}
	};

	handlePreviewRender = () => {
		const { preview } = this.refs;
		ReactDOM.render(this.DOMNode(), preview);
	};

	handleEditorRender = () => {
		const { editor } = this.refs;
		ReactDOM.unmountComponentAtNode(editor);
		ReactDOM.render(<Editor onChange={ this.handleCodeChange } codeText={ this.state.code } />, editor);
	};

	render () {
		const { currentData: { currentComponent, currentFixture } } = this.props;
		const { code } = this.state;
		return (
			<div className={ styles.wrapper }>
				<div className={ styles.preview }>
					<h3 className={ ui.header }>{ `Preview (${currentFixture.name})` }</h3>
					<div ref="preview"></div>
				</div>
				<div className={ styles.markup }>
					<h3 className={ ui.header }>Markup</h3>
					<Markup codeText={ renderComponentMarkup(currentComponent.name, code) } />
				</div>
				<div className={ styles.editor }>
					<h3 className={ ui.header }>Props / state</h3>
					<div ref="editor"></div>

				</div>
			</div>
		);
	}
}
