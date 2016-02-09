'use strict';

import React, { PropTypes } from 'react';
import CodeMirror from 'codemirror';
import PureComponent from 'react-pure-render/component';
import 'codemirror/mode/javascript/javascript';

//import styles from '../_styles/components/Markup.less';

/**
 * Markup
 * @class Markup
 */
export default class Markup extends PureComponent {

	static propTypes = {
		className: React.PropTypes.string,
		lineNumbers: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		readOnly: React.PropTypes.bool,
		tabSize: React.PropTypes.number,
		theme: React.PropTypes.string
	};

	componentDidMount () {
		this.editor = CodeMirror.fromTextArea(this.refs.markup, {
			mode: 'javascript',
			lineNumbers: false,
			smartIndent: true,
			lineWrapping: true,
			tabSize: 4,
			matchBrackets: true,
			theme: 'material',
			readOnly: true
		});
	}

	componentDidUpdate () {
		this.editor.setValue(this.props.codeText);
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
