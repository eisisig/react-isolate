'use strict'

// import filter from 'lodash.filter'
// import assign from 'lodash.assign'
import omitBy from 'lodash/omitBy'
import pickBy from 'lodash/pickBy'
import indexOf from 'lodash/indexOf'

export function findComponents (q, components) {

	console.log('components', components)

	q = normalizeString(q)

	console.log('q', q)

	return pickBy(components, (value, key) => {
		return ~normalizeString(key).indexOf(q)
	})

}

function normalizeString (string) {
	return string.toLowerCase().trim()
}
