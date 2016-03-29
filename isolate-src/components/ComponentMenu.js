'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';
import map from 'lodash.map';

/**
 * Initial props
 */
const getDefaultProps = () => ({
	componentMap: null
});

const getInitialState = () => ({
	selectedFixtureName: null,
	selectedComponentName: null
});

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props }) => {
	const renderMenu = (components = props.componentMap, prevUrl = '') => {
		return (
			<ul key={ prevUrl }>
				{ map(components, (component, name) => {

					const isComponent = 'name' in component;
					const hasFixtures = 'fixtures' in component;
					const hasComponents = 'components' in component;
					const totalFixtures = hasFixtures ? Object.keys(component.fixtures).length : 0;
					const url = prevUrl + '/' + name;

					return (
						<li key={ `${name}-key` }>

							<If condition={ isComponent }>
								<a onClick={ () => props.onSetUrl(url) }>
									<span>{ name }</span>
									<If condition={ hasFixtures }>
										<span>{ totalFixtures }</span>
									</If>
								</a>
								<Else />
								<div>
									<a onClick={ () => props.onSetUrl(url) }>
										<span>{ name }</span>
									</a>
									{ renderMenu(component.components, url + '/components') }
								</div>
							</If>

							<If condition={ hasFixtures }>
								<ul>
									{ map(component.fixtures, (fixture, key) => {
										return (
											<li key={ `${key}-fixture` }>
												<a onClick={ () => props.onSetUrl(`${url}/fixtures/${key}`) }>{ key }</a>
											</li>
										);
									}) }
								</ul>
							</If>

							{/*
							 <Choose>
							 <When condition={ hasFixtures && hasComponent }>
							 </When>
							 <When condition={ !hasFixtures && !hasComponent }>
							 <a onClick={ () => props.onSetUrl(url) }>
							 <span>{ name }</span>
							 </a>
							 <If condition={ Object.keys(component).length }>
							 { renderMenu(component, url) }
							 </If>
							 </When>
							 </Choose>
							 <If condition={ hasFixtures }>
							 <ul>
							 { map(component.fixtures, (fixture, key) => {
							 return (
							 <li key={ `${key}-fixture` }>
							 <a onClick={ () => props.onSetUrl(`${url}/fixtures/${fixture.name}`) }>{ key }</a>
							 </li>
							 );
							 }) }
							 </ul>
							 </If>
							 */}
						</li>
					);
				}) }
			</ul>
		);
	};

	return (
		<div>{ props.componentMap ? renderMenu() : <div>No components</div> }</div>
	);
});

/**
 * Export
 */
export default stitch({
	getInitialState,
	getDefaultProps,
	render
});
