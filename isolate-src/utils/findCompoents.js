'use strict'

import pickBy from 'lodash/pickBy'

export function findComponents (q, components) {
	return find(normalizeString(q), components)
}

function find (q, components) {
	return pickBy(components, (value, key) => ~normalizeString(key).indexOf(q))
}

function normalizeString (string) {
	return string.toLowerCase().trim()
}
