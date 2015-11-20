'use strict';

import React, { PropTypes } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';

//import styles from '../_styles/components/Markup.less';

/**
 * Markup
 * @class Markup
 */
export default class Markup extends React.Component {

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
		readOnly: true,
		tabSize: 4,
		theme: 'material'
	};

	componentDidMount () {
		this.editor = CodeMirror.fromTextArea(this.refs.markup, {
			mode: 'javascript',
			lineNumbers: this.props.lineNumbers,
			smartIndent: true,
			tabSize: this.props.tabSize,
			matchBrackets: true,
			theme: this.props.theme,
			readOnly: this.props.readOnly
		});
	}

	componentDidUpdate () {
		if ( this.props.readOnly ) {
			this.editor.setValue(this.props.codeText);
		}
	}

	render () {
		return (
			<div className="Markup">
				<textarea ref="markup" defaultValue={ this.props.codeText } />
			</div>
		);
	}

	setCode ( code ) {
		this.editor.getDoc().setValue(code);
		this.handleChange();
	}
}
