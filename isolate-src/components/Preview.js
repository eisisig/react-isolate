'use strict';

'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';
import isEqual from 'lodash.isequal';
import get from 'lodash.get';

/**
 * Should component update
 */
const shouldComponentUpdate = ({ nextProps, props }) => !isEqual(nextProps, props);

/**
 * Render component
 * @param {object} component
 * @returns {*}
 */
export const renderComponent = ({ selectedComponent, selectedFixture }) => {
	if ( !selectedComponent ) return null;
	const { Component } = selectedComponent;
	if ( typeof Component === 'function' ) {
		return React.cloneElement(<Component />, { ...selectedFixture });
	}
};

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props }) => <div className="PreviewComponent">{ renderComponent(props) }</div>);

/**
 * Export
 */
export default stitch({ shouldComponentUpdate, render });
