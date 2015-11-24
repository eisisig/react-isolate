'use strict';

import React, { PropTypes } from 'react';
import marked from 'marked';

import ui from '../_styles/ui.less';
import styles from '../_styles/components/Docs.less';

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
export default class Docs extends React.Component {

	//static defaultProps = {};

	//static propTypes = {};

	render () {
		const { docs } = this.props;

		const keys = Object.keys(docs);

		if ( !keys.length ) return null;

		let parsedDocs = [];

		keys.forEach(( key ) => {
			const doc = docs[key];
			const parsedDoc = marked(require('COMPONENTS_PATH/' + doc.filePath.slice(2)));
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
