'use strict';

import _ from 'lodash';
import ReactDOM from 'react-dom';
import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import {renderComponentMarkup} from '../utils';

import Editor from './Editor';
import Markup from './Markup';

import ui from '../../isolate-styles/ui.less';
import styles from '../../isolate-styles/components/Preview.less';

/**
 * # PreviewPanel
 */
export default class Preview extends PureComponent {

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
		const currentComponentName = this.props.currentData.currentComponent.name,
		      nextComponentName    = nextProps.currentData.currentComponent.name,
		      currentName          = this.props.currentData.currentFixture.name,
		      nextName             = nextProps.currentData.currentFixture.name;

		const doUpdate = !_.isEqual(currentName, nextName) || !_.isEqual(currentComponentName, nextComponentName);

		if ( doUpdate ) {
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
		const { code = {} }  = this.state;

		let { state } = code;

		ReactDOM.unmountComponentAtNode(preview);

		const renderedComponent = ReactDOM.render(this.DOMNode(), preview);

		if ( !state && renderedComponent && 'state' in renderedComponent ) {
			state = renderedComponent.state;
		}

		if ( state ) {
			renderedComponent.setState(state, () => {
				renderedComponent.setState = _.wrap(renderedComponent.setState, ( caller, value ) => {
					caller.call(renderedComponent, value);
					const newProps = _.assign(code, { state: value });
					this.setState(newProps, () => {
						this.handleEditorRender(newProps)
					});
				});
			});
		}
	};

	handleEditorRender = () => {
		const { editor } = this.refs;
		ReactDOM.unmountComponentAtNode(editor);
		ReactDOM.render(<Editor onChange={ this.handleCodeChange } codeText={ this.state.code } />, editor);
	};

	render () {
		const { currentData: { currentComponent, currentFixture }, showMarkup, showState } = this.props;
		const showMarkupState = showState || showMarkup;
		const { code } = this.state;
		return (
			<div className={ styles.wrapper }>
				<div className={ showMarkupState ? styles.previewWithMarkup : styles.preview }>
					<h3 className={ ui.header }>{ `Preview (${currentFixture.name})` }</h3>
					<div ref="preview"></div>
				</div>
				{ showMarkup ?
					<div className={ styles.markup }>
						<h3 className={ ui.header }>Markup</h3>

						<Markup
							codeText={ renderComponentMarkup(currentComponent.name, currentFixture.name !== 'defaultProps' || !_.isEqual(code, currentFixture.props) ? code : null )  } />
					</div>
					: null }
				{ showState ?
					<div className={ styles.editor }>
						<h3 className={ ui.header }>Props / state</h3>
						<div ref="editor"></div>
					</div>
					: null }
			</div>
		);
	}
}
