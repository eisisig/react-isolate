'use strict';

import React from 'react';
import {stitch} from 'keo';
import 'brace';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/jsx';
import 'brace/theme/github';
import {Editor, Markup, Panel, Preview, Sidebar, Spec, Topbar} from './index';

import styles from './App.css'

const render = () => {
	return (
		<div className={ styles.root }>

			<div className={ styles.top }>
				<Topbar />
			</div>

			<div className={ styles.bottom }>
				<div className={ styles.sidebar }>Sidebar</div>
				<div className={ styles.main }>
					<div className={ styles.left }>
						<div className={ styles.preview }>preview</div>
						<div className={ styles.markup }>markup</div>
						<div className={ styles.editor }>editor</div>
					</div>
					<div className={ styles.right }>
						<div className={ styles.spec }>spec</div>
						<div className={ styles.doc }>doc</div>
					</div>
				</div>
			</div>


			{/*

			 <Sidebar />
			 <Panel title="Preview"><Preview /></Panel>
			 <Panel title="Editor"><Editor /></Panel>
			 <Panel title="Markup"><Markup /></Panel>
			 <Panel title="Markup"><Markup /></Panel>
			 <Panel title="Spec"><Spec /></Panel>
			 <Panel title="Docs" />
			 */}
		</div>
	);
};

export default stitch({ render });
