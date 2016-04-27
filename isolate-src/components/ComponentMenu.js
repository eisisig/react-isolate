'use strict'

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {stitch} from 'keo'
import styleclasses from 'styleclasses'
import map from 'lodash/map'
import filter from 'lodash/filter'
import isObject from 'lodash/isObject'
import {navigate} from '../actions'

import styles from '../styles/ComponentMenu.less'

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

	const sx = styleclasses(styles)

	const renderMenu = (components, prevUrl = '', level = 1) => {

		return (
			<ul className={ sx('list', null, ['ul']) } key={ `components-${level}` }>
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
								<li className={ sx('item') } key={ key }>
									<a className={ sx('link') } onClick={ () => props.dispatch(navigate(`${url}`)) }>{ comp.name }</a>
									<If condition={ !!fixtures }>
										<ul className={ sx('fixtures', null, ['ul']) }>
											{ map(fixtures, fixture => {
												if ( isObject(fixture) ) {
													return (
														<li className={ sx('item') } key={`${key}-${fixture.name}`}>
															<a
																className={ sx('link') }
																onClick={ () => props.dispatch(navigate(`${url}/fixtures/${fixture.name}`)) }>
																{ fixture.name }
															</a>
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
								<li className={ sx('item') } key={ `${component._name}` }>
									<a className={ sx('link') } onClick={ () => props.dispatch(navigate(`${url}`)) }>{ component._name }</a>
									<ul className={ sx('sublist', null, ['ul']) }>
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
