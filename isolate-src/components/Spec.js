'use strict'

import React, {PropTypes} from 'react'
import {stitch} from 'keo'
import {connect} from 'react-redux'
import orderBy from 'lodash.orderby'

const mapStateToProps = state => ({
	selectedComponent: state.selectedComponent
})

const propTypes = {
	selectedComponent: PropTypes.object
}

const sortProps = props => {
	return orderBy(Object.keys(props).map((prop) => ({
		name: prop,
		...props[prop]
	})), ['required', 'name'], ['desc'])
}

const getType = prop => {
	return prop.type ? prop.type.name : null
}

const getDefault = prop => {
	if ( !prop.defaultValue ) return null
	return <span className="code">{ prop.defaultValue.value }</span>
}

const getTypeValues = prop => {

	if ( !prop.hasOwnProperty('value') && !prop.hasOwnProperty('type') ) return null

	const { value, name: type, raw } = prop.type

	// shape
	if ( value && ( type === 'shape'  ) ) {
		return Object.keys(value).map((key, i) => <span key={ i } className="code">{ `${key}<${value[key].name}>` }</span>)
	}
	// arrayOf
	else if ( value && ( type === 'arrayOf' ) ) {
		return <span>[<span className="code">{`<${value.name}>`}</span>,...]</span>
	}
	// enum, union
	else if ( value && ( type === 'enum' || type === 'union' ) ) {
		return (
			<span className="code">
					{ value.map((en, i) => `${ en.name || en.value}`.replace(/'/gmi, '')).join(', ') }
				</span>
		)
	}
	// instanceOf
	else if ( value && ( type === 'instanceOf' ) ) {
		return <span className="code">{ `${value}()` }</span>
	}
	// custom
	else if ( type === 'custom' ) {
		return <span className="code">{ raw }</span>
	}
	else {
		//console.log('I fell through', 'type', type, 'value', value)
	}
}

/**
 * Render
 */
const render = ({ props }) => {

	return null

	if ( !props.selectedComponent ) return null

	let spec = null

	try {
		spec = require('!!docgen?markdownDescription!COMPONENTS_PATH/' + props.selectedComponent.filePath.slice(2))
	} catch ( e ) {
		// console.log('e', e)
	}

	spec = spec.length ? spec[0] : spec

	// WTF?
	if ( 'props' in spec ) {} else { return null }

	const sortedProps = sortProps(spec.props)

	return (
		<div>
			<table className="">
				<thead>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Values</th>
					<th>Default</th>
					<th>Description</th>
				</tr>
				</thead>
				<tbody>
				{sortedProps.map((prop, i) => {
					return (
						<tr key={ i } className={ `${prop.required ? 'is-required' : '' }` }>
							<td><strong>{ prop.name + (prop.required ? '*' : '') }</strong></td>
							<td><em><span className="code">{ getType(prop) }</span></em></td>
							<td>{ getTypeValues(prop) }</td>
							<td>{ getDefault(prop) }</td>
							<td>{ prop.description }</td>
						</tr>
					)
				}) }
				</tbody>
			</table>
		</div>
	)
}

export default connect(mapStateToProps)(stitch({ propTypes, render }))
