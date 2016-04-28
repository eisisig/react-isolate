'use strict'

const slice = require('lodash/fp/slice')
const split = require('lodash/fp/split')
const reverse = require('lodash/fp/reverse')

const map = require('lodash/map')
const merge = require('lodash/merge')
const flow = require('lodash/flow')
const reduce = require('lodash/reduce')
const filter = require('lodash/filter')
const includes = require('lodash/includes')

const getComponents = () => {
	const context = require.context('COMPONENTS_PATH', true, /^\.\/.*\.js$/)
	return { context, files: context.keys().reverse() }
}

const components = getComponents()

const getFile = (array) => array[array.length - 1].replace('.js', '')
const isFile = (part) => ~part.indexOf('.js')
const isFixturePath = (path) => ~path.indexOf('/fixtures/')

const getFixtureParent = (array) => array[array.indexOf('fixtures') - 1]
const getBeforeFixtures = (array) => array.slice(0, array.indexOf('fixtures'))

const componentsMap = reduce(components.files, (last, current) => {

	let componentObj = {}
	let fixtureObj = {}
	let returnObj = {}

	const currentArr = flow(
		split('/'),
		slice(1, this.length),
	)(current)

	if ( isFixturePath(current) && isFile(current) ) {

		const fixtureParent = getFixtureParent(currentArr)
		const fixtureName = getFile(currentArr)

		let content = components.context(current)

		if ( 'default' in content ) {
			content = content.default
		}

		Object.assign(fixtureObj, {
			[fixtureParent]: {
				fixtures: {
					[fixtureName]: {
						path: current,
						content: content,
						name: fixtureName,
					}
				}
			}
		})

	} else {
		const fileName = getFile(currentArr)

		let Component = components.context(current)

		if ( 'default' in Component ) {
			Component = Component.default
		}

		merge(componentObj, {
			[fileName]: {
				component: {
					name: fileName,
					path: current,
					Component: Component,
				}
			}
		})
	}

	returnObj = merge(componentObj, fixtureObj)

	const arrayBeforeFixtures = getBeforeFixtures(currentArr)

	if ( arrayBeforeFixtures.length === 2 ) {
		returnObj = {
			[currentArr[0]]: {
				components: returnObj
			}
		}
	}

	if ( arrayBeforeFixtures.length > 2 ) {
		// TODO: RECURSE
	}

	merge(last, returnObj)

	return last
}, {})

module.exports = componentsMap
