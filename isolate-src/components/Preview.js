'use strict';

import React, {PropTypes} from 'react';
import {resolutionMap, stitch} from 'keo';
import isEqual from 'lodash.isequal';

/* ------------------------------------------------------------
 Should Component Update
 ----------------------------------------------------------- */
const shouldComponentUpdate = ({ nextProps, props }) => !isEqual(nextProps, props);

/* ------------------------------------------------------------
 Render component
 ----------------------------------------------------------- */
export const renderComponent = ({ selectedComponent, selectedFixture }) => {

	console.log('Preview: renderComponent');

	if ( !selectedComponent ) return null;
	const { Component } = selectedComponent;

	const props = selectedFixture || {};

	if ( typeof Component === 'function' ) {
		console.log('props', props);
		return React.cloneElement(<Component />, { ...props });
	}
};

/* ------------------------------------------------------------
 Render
 ----------------------------------------------------------- */
const render = ({ props }) => <div className="PreviewComponent">{ renderComponent(props) }</div>;

export default stitch({ shouldComponentUpdate, render });
