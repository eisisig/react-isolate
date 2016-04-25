'use strict'

import get from 'lodash.get'

export default function urlToComponent (url, components) {

	let pathArr = url.split('/').slice(1)

	let fixturePath, selectedFixture

	const fixtureIndex = pathArr.indexOf('fixtures')

	if ( ~fixtureIndex ) {
		fixturePath = pathArr.splice(fixtureIndex, 2)
	}

	let selectedComponent = get(components, pathArr)

	if ( selectedComponent && 'components' in selectedComponent ) {
		selectedComponent = null
	}

	if ( selectedComponent ) {
		selectedFixture = get(selectedComponent, fixturePath)
	}

	return {
		selectedFixture,
		selectedComponent,
	}
}
