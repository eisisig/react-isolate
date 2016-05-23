'use strict'

import React, {PropTypes} from 'react'
import {stitch} from 'keo'
import {connect} from 'react-redux'
import get from 'lodash/get'
import {renderPropTypes} from '../utils'

const displayName = 'Spec'

const mapStateToProps = state => ({
	selectedComponent: state.selectedComponent
})

const propTypes = {
	selectedComponent: PropTypes.func
}

// const sortProps = props => {
// 	return orderBy(Object.keys(props).map(( prop ) => ({
// 		name: prop,
// 		...props[prop]
// 	})), ['required', 'name'], ['desc'])
// }
//
// const getType = prop => {
// 	return prop.type ? prop.type.name : null
// }
//
// const getDefault = prop => {
// 	if ( !prop.defaultValue ) return null
// 	return <span className="code">{ prop.defaultValue.value }</span>
// }
//
// const getTypeValues = prop => {
//
// 	if ( !prop.hasOwnProperty('value') && !prop.hasOwnProperty('type') ) return null
//
// 	const { value, name: type, raw } = prop.type
//
// 	// shape
// 	if ( value && ( type === 'shape'  ) ) {
// 		return Object.keys(value).map(( key, i ) => <span key={ i } className="code">{ `${key}<${value[key].name}>` }</span>)
// 	}
// 	// arrayOf
// 	else if ( value && ( type === 'arrayOf' ) ) {
// 		return <span>[<span className="code">{`<${value.name}>`}</span>,...]</span>
// 	}
// 	// enum, union
// 	else if ( value && ( type === 'enum' || type === 'union' ) ) {
// 		return (
// 			<span className="code">
// 					{ value.map(( en, i ) => `${ en.name || en.value}`.replace(/'/gmi, '')).join(', ') }
// 				</span>
// 		)
// 	}
// 	// instanceOf
// 	else if ( value && ( type === 'instanceOf' ) ) {
// 		return <span className="code">{ `${value}()` }</span>
// 	}
// 	// custom
// 	else if ( type === 'custom' ) {
// 		return <span className="code">{ raw }</span>
// 	}
// 	else {
// 		//console.log('I fell through', 'type', type, 'value', value)
// 	}
// }

const render = ( { props: { selectedComponent } } ) => {

	if ( !selectedComponent || typeof selectedComponent !== 'function' && !selectedComponent._filePath ) {
		return null
	}

	let spec = null

	try {
		spec = require('!!docgen?markdownDescription!COMPONENTS_PATH/' + selectedComponent._filePath.slice(2))
	} catch ( e ) {
		console.log('Spec: Load file', e)
	}

	spec = get(spec[ 0 ], 'props')

	console.log('spec', spec)

	if ( !spec ) {
		return <div>No prop validations defined</div>
	}

	return (
		<div>
			{ renderPropTypes(spec) }
		</div>
	)
}

export default stitch({ displayName, propTypes, render }, mapStateToProps)
