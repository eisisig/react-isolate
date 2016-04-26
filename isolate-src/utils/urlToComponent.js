'use strict'

import get from 'lodash/get'

export function urlToComponent (url, components) {

	let fixtureName
	let pathArr = url.split('/').slice(1)

	if ( ~url.indexOf('/fixtures') ) {
		fixtureName = pathArr[pathArr.length - 1]
		pathArr = pathArr.slice(0, pathArr.length - 2)
	}

	let selectedComponent = get(components, pathArr)

	if ( selectedComponent._name in selectedComponent ) {
		selectedComponent = selectedComponent[selectedComponent._name]
	}

	selectedComponent = selectedComponent.Component

	const selectedFixture = get(components, [pathArr[0], '_fixtures'].concat(pathArr.length >= 2 ? [pathArr[1], fixtureName] : fixtureName))

	return {
		selectedFixture,
		selectedComponent,
	}
}
