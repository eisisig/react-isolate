'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';

const getInitialState = () => ({});

const getDefaultProps = () => ({});

const componentWillUpdate = () => {};

const componentDidUpdate = () => {};

const shouldComponentUpdate = () => true;

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props, state, setState }) => {
	return (
		<div>Markup</div>
	)
});

/**
 * Export
 */
export default stitch({
	getInitialState,
	getDefaultProps,
	componentWillUpdate,
	componentDidUpdate,
	shouldComponentUpdate,
	render
});
