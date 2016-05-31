'use strict'

import React, {PropTypes} from 'react'
import {stitch} from 'keo'
import styleclasses from 'styleclasses'
import map from 'lodash/map'
import sortObject from '../utils/sortObject'
import {navigate} from '../actions'

import styles from '../styles/ComponentMenu.less'

const sx = styleclasses(styles)

const displayName = 'ComponentMenu'

const mapStateToProps = state => ({
	componentMap: state.componentMap,
	searchResults: state.searchResults,
})

const propTypes = {
	componentMap: PropTypes.object,
	searchResults: PropTypes.object,
}

const renderMenu = ( components, prevUrl = '', level = 1, { dispatch } ) => {

	const hasFixtures = value => 'fixtures' in value && Object.keys(value.fixtures).length
	const hasComponents = value => 'components' in value && Object.keys(value.components).length

	const url = `${prevUrl}`

	components = sortObject(components)

	const itemMap = ( value, key ) => (
		<li className={ sx('item') } key={ `${key}-${level}` }>
			<a className={ sx('link') } onClick={ () => dispatch(navigate(`${url}/${key}`)) }>{ key }</a>
			{ hasFixtures(value) ? <ul>{ map(value.fixtures, ( v, k ) => (
				<li className={ sx('item') } key={ `${key}-${k}-${level}` }>
					<a className={ sx('link') } onClick={ () => dispatch(navigate(`${url}/${key}/fixtures/${k}`)) }>&rarr; { k }</a>
				</li>
			)) }</ul> : null }
			{ hasComponents(value) ? renderMenu(value.components, `/${prevUrl}${key}`, level += 1, { dispatch }) : null }
		</li>
	)

	return (
		<ul key={ `menu-${level}` }>
			{ map(components, itemMap) }
		</ul>
	)
}

const render = ( { props, args } ) => {
	const components = props.searchResults || props.componentMap
	return (
		<div>
			<If condition={ !!components }>
				{ renderMenu(components, '', 1, args) }
			</If>
		</div>
	)
}

export default stitch({ displayName, propTypes, render }, mapStateToProps)
