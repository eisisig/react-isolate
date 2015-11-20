'use strict';

import _ from 'lodash';
import React, { PropTypes } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';

import styles from '../_styles/components/Editor.less';

/**
 * Editor
 * @class Editor
 */
//import analyzeRender from '../_lib/analyzeRender';
//@analyzeRender
export default class Editor extends React.Component {

	static propTypes = {
		className: React.PropTypes.string,
		lineNumbers: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		readOnly: React.PropTypes.bool,
		tabSize: React.PropTypes.number,
		theme: React.PropTypes.string
	};

	static defaultProps = {
		className: '',
		lineNumbers: false,
		readOnly: false,
		tabSize: 4,
		theme: 'material'
	};

	componentDidMount () {
		this.editor = CodeMirror.fromTextArea(this.refs.editor, {
			mode: 'javascript',
			lineNumbers: this.props.lineNumbers,
			smartIndent: true,
			tabSize: this.props.tabSize,
			matchBrackets: true,
			//lineWrapping: true,
			//autofocus: true,
			theme: this.props.theme,
			readOnly: this.props.readOnly
		});

		this.editor.on('change', this.handleChange);
	}

	//shouldComponentUpdate ( nextProps ) {
		//const shouldUpdate = !_.isEqual(this.props.codeText, nextProps.codeText);
		//if ( shouldUpdate ) {
		//	this.editor.setValue(JSON.stringify(nextProps.codeText, null, 4));
		//}
		//return shouldUpdate;
	//}

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
