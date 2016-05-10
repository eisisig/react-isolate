'use strict';

import React from 'react'
import map from 'lodash/map'
import get from 'lodash/get'
import has from 'lodash/has'
import isEmpty from 'lodash/isEmpty'
import orderBy from 'lodash/orderBy'

export function renderPropTypes ( spec ) {

	if ( isEmpty(spec) ) { return null }

	spec = orderByRequired(spec)

	return (
		<table>
			<thead>
			<tr>
				<th>Name</th>
				<th>Type</th>
				<th>Default</th>
				<th>Values</th>
				<th>Description</th>
			</tr>
			</thead>
			<tbody>
			{ map(spec, ( prop ) => {

				const name = get(prop, 'name')
				const type = get(prop, 'type.name')
				const defaultValue = cleanString(get(prop, 'defaultValue.value'))
				const typeValues = has(prop, 'type.value') ? getTypeValues(type, get(prop, 'type.value')) : ''
				const description = get(prop, 'description')
				const required = get(prop, 'required') ? '*' : ''

				return (
					<tr key={ `prop-${name}` }>
						<td>{ name }{ required }</td>
						<td>{ type }</td>
						<td>{ defaultValue }</td>
						<td>{ typeValues }</td>
						<td>{ description }</td>
					</tr>
				)
			}) }
			</tbody>
		</table>
	)
}

function getTypeValues ( type, values ) {

	switch ( type ) {
		case 'enum':
			return map(values, val => cleanString(val.value)).join(', ')
			break
		case 'union':
			return map(values, val => cleanString(val.name)).join(', ')
			break
		case 'array':
		case 'string':
		case 'bool':
		case 'func':
		case 'number':
		case 'object':
		case 'arrayOf':
		case 'custom':
		case 'shape':
		case 'node':
		case 'element':
		case 'instanceOf':
		default:
			console.log(`TODO: ${type}`)
			return `TODO: ${type}`
	}

}

function orderByRequired ( props ) {
	return orderBy(Object.keys(props).map(( prop ) => ({
		name: prop,
		...props[prop]
	})), ['required', 'name'], ['desc'])
}

function cleanString ( string ) {
	if ( !!string ) {
		return string.replace(/'/gi, '')
	}
	return ''
}
