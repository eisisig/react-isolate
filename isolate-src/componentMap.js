'use strict'

/**
 * TODO: Handle more levels
 */
const some = require('lodash/some')
const flow = require('lodash/flow')
const merge = require('lodash/merge')
const reduce = require('lodash/reduce')
const slice = require('lodash/fp/slice')
const split = require('lodash/fp/split')

const getComponents = () => {
	const context = require.context('COMPONENTS_PATH', true, /^\.\/.*\.js$/)
	return { context, files: context.keys().reverse() }
}

const components = getComponents()

const getFile = ( array ) => array[ array.length - 1 ].replace('.js', '')
const isFile = ( part ) => ~part.indexOf('.js')
const isFixturePath = ( path ) => ~path.indexOf('/fixtures/')

const getFixtureParent = ( array ) => array[ array.indexOf('fixtures') - 1 ]
const getBeforeFixtures = ( array ) => array.slice(0, array.indexOf('fixtures'))

const componentsMap = reduce(components.files, ( last, current ) => {

	let componentObj = {}
	let fixtureObj = {}
	let returnObj = {}

	const blacklist = [ 'index.js', 'rules.js', 'utils.js' ]

	if ( some(blacklist, part => ~current.indexOf(part)) ) {
		return last
	}

	const currentArr = flow(
		split('/'),
		slice(1, this.length)
	)(current)

	if ( isFixturePath(current) && isFile(current) ) {

		const fileName = getFile(currentArr)
		const fixtureParent = getFixtureParent(currentArr)

		let content = components.context(current)

		if ( 'default' in content ) {
			content = content.default
		}

		Object.assign(fixtureObj, {
			[fixtureParent]: {
				fixtures: {
					[fileName]: {
						path: current,
						// content: () => content,
						name: fileName,
					}
				}
			}
		})

		if ( currentArr.length > 3 && currentArr[ 0 ] !== fileName ) {
			fixtureObj = {
				[currentArr[ 0 ]]: {
					components: fixtureObj
				}
			}
		}

	} else {

		const fileName = getFile(currentArr)

		// let Component = components.context(current)
		//
		// if ( 'default' in Component ) {
		// 	Component = Component.default
		// }

		merge(componentObj, {
			[fileName]: {
				component: {
					name: fileName,
					path: current,
					// Component: Component,
				}
			}

		})

		if ( currentArr.length > 1 && currentArr[ 0 ] !== fileName ) {
			componentObj = {
				[currentArr[ 0 ]]: {
					components: componentObj,
				}
			}
		}
	}

	returnObj = merge(componentObj, fixtureObj)

	merge(last, returnObj)

	return last
}, {})

module.exports = componentsMap
