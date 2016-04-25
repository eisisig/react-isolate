'use strict';

import React from 'react';
import {stitch} from 'keo';
import 'brace';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/jsx';
import 'brace/theme/github';
import SplitPane from 'react-split-pane';
import {Editor, Markup, Panel, Preview, Sidebar, Spec, Topbar} from './index';

const render = () => {
	return (
		<div>

			<Topbar />

			<SplitPane split="vertical" minSize="220px" defaultSize="220px">

				<Sidebar />

				<SplitPane split="vertical" minSize="400px" defaultSize="50%">

					<SplitPane split="horizontal">
						<Panel title="Preview"><Preview /></Panel>
						<SplitPane split="horizontal">
							{/*
							<Panel title="Editor"><Editor /></Panel>
							*/}
							<Panel title="Markup"><Markup /></Panel>
							<Panel title="Markup"><Markup /></Panel>
						</SplitPane>
					</SplitPane>

					<SplitPane split="horizontal">
						<Panel title="Spec"><Spec /></Panel>
						<Panel title="Docs" />
					</SplitPane>

				</SplitPane>

			</SplitPane>
		</div>
	);
};

export default stitch({ render });
