'use strict'

import get from 'lodash/get'
import flow from 'lodash/flow'
import reduce from 'lodash/reduce'
import slice from 'lodash/slice'
import split from 'lodash/split'
import indexOf from 'lodash/indexOf'

export function urlToComponent ( url, components ) {

	let fixtureArr
	let selectedComponent = null
	let selectedFixture = null

	let componentArr = flow(string => split(string, '/'), arr => slice(arr, 1, arr.length))(url)

	const fixtureIndex = indexOf(componentArr, 'fixtures')
	const fixComponentsPath = arr => reduce(arr, ( l, c, i ) => i + 1 < arr.length ? l.concat([ c, 'components' ]) : l.concat([ c ]), [])

	if ( ~fixtureIndex ) {
		fixtureArr = slice(componentArr, fixtureIndex, componentArr.length)
		componentArr = slice(componentArr, 0, fixtureIndex)
	}

	const selected = get(components, fixComponentsPath(componentArr).concat('component'))
	const fixtures = get(components, fixComponentsPath(componentArr).concat('fixtures'))

	console.log('selected', selected)

	if ( selected ) {
		selectedComponent = selected
	}

	if ( !!fixtureArr ) {
		const currentFixture = fixtureArr.pop()
		selectedFixture = get(fixtures, [ currentFixture ])
	}

	if ( selectedComponent && selectedComponent.hasOwnProperty('components') ) {
		selectedComponent = null
	}

	return { selectedFixture, selectedComponent }
}
