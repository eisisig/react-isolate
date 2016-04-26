'use strict'

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {stitch} from 'keo'
import map from 'lodash/map'
import filter from 'lodash/filter'
import isObject from 'lodash/isObject'

import {navigate} from '../actions'

const mapStateToProps = state => ({
	componentMap: state.componentMap,
	searchResults: state.searchResults,
})

const propTypes = {
	componentMap: PropTypes.object,
	searchResults: PropTypes.object,
}

/**
 * Render
 */
const render = ({ props }) => {

	const renderMenu = (components, prevUrl = '', level = 1) => {

		return (
			<ul key={ `components-${level}` }>
				{ map(components, (component) => {

					const getComponents = () => filter(component, (item, key) => !key.startsWith('_'))
					const hasComponents = Object.keys(getComponents(component)).length
					const hasFixtures = name => '_fixtures' in component && component._fixtures[name] || component._fixtures

					if ( component._name === undefined ) return

					if ( hasComponents ) {

						const url = `${prevUrl}/${component._name}`
						const subComponents = getComponents()

						const itemBlock = (comp, url) => {

							const fixtures = hasFixtures(comp.name)
							const key = `${component._name}-${comp.name || component._name}`

							return (
								<li key={ key }>
									<a onClick={ () => props.dispatch(navigate(`${url}`)) }>{ comp.name }</a>
									<If condition={ !!fixtures }>
										<ul>
											{ map(fixtures, fixture => {
												if ( isObject(fixture) ) {
													return (
														<li key={`${key}-${fixture.name}`}>
															<a onClick={ () => props.dispatch(navigate(`${url}/fixtures/${fixture.name}`)) }>{ fixture.name }</a>
														</li>
													)
												}
												return null
											}) }
										</ul>
									</If>
								</li>
							)
						}

						if ( subComponents.length === 1 ) {
							return itemBlock(subComponents[0], url)
						} else {
							return (
								<li key={ `${component._name}` }>
									<a onClick={ () => props.dispatch(navigate(`${url}`)) }>{ component._name }</a>
									<ul>
										{ map(subComponents, (comp) => itemBlock(comp, `${url}/${comp.name}`)) }
									</ul>
								</li>
							)
						}
					}
				}) }
			</ul>
		)
	}

	return (
		/*eslint-disable */
		<div>{ props.searchResults || props.componentMap ? renderMenu(props.searchResults || props.componentMap) : <div>No components</div> }</div>
		/*eslint-enable */
	)
}

export default connect(mapStateToProps)(stitch({ propTypes, render }))
