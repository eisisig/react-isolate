'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';

import ace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';

/**
 * React
 */
const getInitialState = () => ({});
const getDefaultProps = () => ({});
const componentDidMount = () => {};
const shouldComponentUpdate = () => true;

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props, props: { selectedFixture }, state, setState }) => {

	const handleChange = (value) => {
		console.log('value', value);
	};

	return (
		<If condition={ selectedFixture }>
			<AceEditor
				value={ JSON.stringify(selectedFixture, null, 4) }
				onChange={ handleChange }
				mode="javascript"
				theme="github" />
		</If>
	)
});

/**
 * Export
 */
export default stitch({
	getInitialState,
	getDefaultProps,
	componentDidMount,
	shouldComponentUpdate,
	render
});
