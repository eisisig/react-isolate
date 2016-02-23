'use strict';

import _ from 'lodash';
import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/json-lint';


import styles from '../../isolate-styles/components/Editor.less';

/**
 * Editor
 * @class Editor
 */
//import analyzeRender from '../_lib/analyzeRender';
//@analyzeRender
export default class Editor extends PureComponent {

	static propTypes = {
		className: React.PropTypes.string,
		lineNumbers: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		readOnly: React.PropTypes.bool,
		tabSize: React.PropTypes.number,
		theme: React.PropTypes.string
	};

	static defaultProps = {};

	componentDidMount () {
		this.editor = CodeMirror.fromTextArea(this.refs.editor, {
			mode: 'application/json',
			lineNumbers: false,
			smartIndent: true,
			lineWrapping: true,
			tabSize: 4,
			matchBrackets: true,
			gutters: ['CodeMirror-lint-markers'],
			lint: true,
			theme: 'material',
			readOnly: false
		});

		this.editor.on('change', this.handleChange);
	}

	handleChange = () => {
		const { readOnly, onChange } = this.props;
		if ( !readOnly && onChange ) {
			onChange(this.editor.getValue());
		}
	};

	render () {
		const { codeText } = this.props;
		return (
			<div className="Editor">
				<textarea ref="editor" defaultValue={ JSON.stringify(codeText, null, 4) } />
			</div>
		);
	}
}
