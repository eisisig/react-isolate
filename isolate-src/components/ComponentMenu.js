'use strict';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {stitch} from 'keo';
import map from 'lodash.map';

import {navigate} from '../redux/actions';

const mapStateToProps = state => ({
	componentMap: state.componentMap,
	searchResults: state.searchResults
});

const propTypes = {
	componentMap: PropTypes.object,
	searchResults: PropTypes.object
};

/**
 * Render
 */
const render = ({ props }) => {
	const renderMenu = (components, prevUrl = '') => {
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
								<a onClick={ () => props.dispatch(navigate(url)) }>
									<span>{ name }</span>
									<If condition={ hasFixtures }>
										<span>{ totalFixtures }</span>
									</If>
								</a>
								<Else />
								<div>
									<a onClick={ () => props.dispatch(navigate(url)) }>
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
												<a onClick={ () => props.dispatch(navigate(`${url}/fixtures/${key}`)) }>{ key }</a>
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
		<div>{ props.searchResults || props.componentMap ? renderMenu(props.searchResults || props.componentMap) : <div>No components</div> }</div>
	);
};

export default connect(mapStateToProps)(stitch({ propTypes, render }));
