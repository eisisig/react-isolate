'use strict'

import filter from 'lodash.filter'
// import assign from 'lodash.assign'
// import reduce from 'lodash.reduce'

export default function findComponents (q, list, results = []) {

	const found = (q, list) => filter(list, (item) => {

		if ( 'components' in item ) {

		} else {
			results.push({
				[item.name]: item
			})
		}

	})

	// return reduce(list, (res, item,) => {
	// 	if ( 'name' in item ) {
	// 		if ( find(q, item.name) ) {
	// 			assign(res, { [item.name]: item })
	// 		}
	// 	}
	// 	if ( 'components' in item ) {
	// 		return assign(res, findComponents(q, item.components))
	// 	}
	// 	return res
	// }, {})

	console.log('found', found(q, list))
}

function find (q, name) {
	return ~name.toUpperCase().indexOf(q.toUpperCase())
}
