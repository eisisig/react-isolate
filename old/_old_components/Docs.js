'use strict';

import _ from 'lodash';
import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import marked from 'marked';
import hljs from 'highlight.js';
import { AllHtmlEntities } from 'html-entities';

const entities = new AllHtmlEntities();

import ui from '../../_styles/ui.less';
import styles from '../../_styles/components/Docs.less';

marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
});

/**
 * # Docs
 */
export default class Docs extends PureComponent {

	componentDidMount () {
		this.highlightSyntax();
	}

	componentDidUpdate () {
		this.highlightSyntax();
	}

	highlightSyntax = () => {
		const codeBlocks = document.getElementsByTagName('code');
		if ( codeBlocks ) {
			_.forEach(codeBlocks, ( block ) => {
				hljs.highlightBlock(block)
			});
		}
	};

	render () {
		const { docs } = this.props;

		const keys = Object.keys(docs);

		if ( !keys.length ) return null;

		let parsedDocs = [];

		keys.forEach(( key ) => {
			const doc = docs[key];
			const requiredDoc = require('COMPONENTS_PATH/' + doc.filePath.slice(2));
			const parsedDoc = entities.decode(marked(requiredDoc));
			if ( parsedDoc ) {
				parsedDocs.push(parsedDoc);
			}
		});

		return (
			<div className={ styles.wrapper }>
				<h3 className={ ui.header }>Docs</h3>
				{ parsedDocs.length ? parsedDocs.map(( doc, i ) => {
					return <div key={ i } className={ styles.doc } dangerouslySetInnerHTML={{ __html: doc }}></div>;
				}) : null }
			</div>
		);
	}
}

function decodeHtml ( html ) {
	var txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
}
