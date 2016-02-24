'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';

import forOwn from 'lodash.forown';
import map from 'lodash.map';

/**
 * Initial props
 */
const getDefaultProps = () => ({
	componentMap: null
});

/**
 * Render component menu
 * @param {object} components
 */
const renderMenu = (components, onSetComponent) => {

	return (
		<ul>
			{ map(components, (component, name, index) => {
				return (
					<li key={ `${name}-key` }>
						
						<If condition={ 'fileName' in component }>
							<a onClick={ () => onSetComponent(component) }>{ name }</a>
							<Else />
							<div>{ name }</div>
						</If>

						<If condition={ 'components' in component }>
							{ renderMenu(component.components, onSetComponent) }
						</If>

					</li>
				);
			}) }
		</ul>
	);

};

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props, props: { componentMap, onSetComponent } }) => {
	return (
		<div>{ componentMap ? renderMenu(componentMap, onSetComponent) : <div>No components</div> }</div>
	)
});

/**
 * Export
 */
export default stitch({
	getDefaultProps,
	render
});
