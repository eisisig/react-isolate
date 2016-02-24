'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';

const getInitialState = () => ({});

const getDefaultProps = () => ({});

const componentWillUpdate = () => {};

const componentDidUpdate = () => {};

const componentShouldUpdate = () => {};

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props, state, setState }) => {
	return (
		<div>Main</div>
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
	componentShouldUpdate,
	render
});
