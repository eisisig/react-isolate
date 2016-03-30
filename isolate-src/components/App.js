'use strict';

import React, {PropTypes} from 'react';
import {stitch} from 'keo';
import ace from 'brace';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/jsx';
import 'brace/theme/github';
import SplitPane from 'react-split-pane';
import {Editor, Markup, Panel, Preview, Sidebar, Spec, Topbar} from './index';

const render = ({ props }) => {
	console.log('props', props);
	return (
		<div>
			<Topbar />
			<SplitPane split="vertical" minSize="220" defaultSize="220">

				<Sidebar />

				<SplitPane split="vertical" minSize="400" defaultSize="50%">

					<SplitPane split="horizontal">
						<Panel title="Preview"><Preview { ...props } /></Panel>
						<SplitPane split="horizontal">
							<Panel title="Editor"><Editor { ...props } /></Panel>
							<Panel title="Markup"><Markup { ...props } /></Panel>
						</SplitPane>
					</SplitPane>

					<SplitPane split="horizontal">
						<Panel title="Spec"><Spec { ...props } /></Panel>
						<Panel title="Docs" />
					</SplitPane>

				</SplitPane>

			</SplitPane>
		</div>
	);
};

export default stitch({ render });
