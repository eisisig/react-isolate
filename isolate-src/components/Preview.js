'use strict';

'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';
import isEqual from 'lodash.isequal';

/* ------------------------------------------------------------
 Should Component Update
 ----------------------------------------------------------- */
const shouldComponentUpdate = ({ nextProps, props }) => !isEqual(nextProps, props);

/* ------------------------------------------------------------
 Render component
 ----------------------------------------------------------- */
export const renderComponent = ({ selectedComponent, selectedFixture }) => {
	if ( !selectedComponent ) return null;
	const { Component } = selectedComponent;

	const props = selectedFixture || {};

	if ( typeof Component === 'function' ) {
		return React.cloneElement(<Component />, { ...props });
	}
};

/* ------------------------------------------------------------
 Render
 ----------------------------------------------------------- */
const render = pipe(resolutionMap, ({ props }) => <div className="PreviewComponent">{ renderComponent(props) }</div>);

export default stitch({ shouldComponentUpdate, render });
