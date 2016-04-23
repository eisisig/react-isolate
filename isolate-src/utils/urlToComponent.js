'use strict'

import get from 'lodash.get'

export default function urlToComponent (url, components) {

	let pathArr = url.split('/').slice(1)

	let fixturePath, selectedFixtures

	const fixtureIndex = pathArr.indexOf('fixtures')

	if ( ~fixtureIndex ) {
		fixturePath = pathArr.splice(fixtureIndex, 2)
	}

	const selectedComponent = get(components, pathArr)

	if ( selectedComponent ) {
		selectedFixtures = get(selectedComponent, fixturePath)
	}

	return {
		component: selectedComponent,
		fixture: selectedFixtures,
	}
}
