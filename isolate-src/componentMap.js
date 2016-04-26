'use strict'

const flow = require('lodash/flow')
const includes = require('lodash/includes')
const assign = require('lodash/assign')
const merge = require('lodash/merge')
const reduce = require('lodash/reduce')

const getComponents = () => {
	const context = require.context('COMPONENTS_PATH', true, /^\.\/.*\.js$/)
	return { context, files: context.keys() }
}

const getFixtures = () => {
	return null
	// try {
	// 	const context = require.context('FIXTURES_PATH', true, /^\.\/.*\.js$/)
	// 	return { context, files: context.keys() }
	// } catch ( e ) {
	// 	return null
	// }
}

const isFixture = path => !!~path.indexOf('fixtures')
const isFile = string => !!~string.indexOf('.js')
const removeExt = string => string.replace('.js', '')
const createPathArray = flow(path => path.split('/'), arr => arr.slice(1, arr.length), arr => arr.reverse())

const components = getComponents()
const fixtures = getFixtures()

const pathsToObject = (result, path) => {

	const pathArr = createPathArray(path)

	const mainComponentName = pathArr[pathArr.length - 1]

	const arrayToObject = (res, part) => {

		if ( includes(['index.js'], part) ) {
			return res
		}

		if ( !isFile(part) ) return { [part === 'fixtures' ? `_${part}` : part]: assign(res, { _name: mainComponentName }) }

		const name = removeExt(part)
		// let Component = components.context(path)
		// if ( 'default' in Component ) Component = Component.default

		if ( isFixture(path) ) {
			return assign({
				[name]: {
					name, path,
					// props: Component,
					file: part,
				}
			}, {
				defaultProps: {
					path: null,
					file: null,
					name: 'defaultProps',
					_name: 'defaultProps',
					// props: Component,
				}
			})
		} else {
			return {
				[name]: {
					name, path,
					// Component: Component,
					_name: name,
					file: part,
				}
			}
		}
	}

	const componentMap = reduce(pathArr, arrayToObject, {})

	merge(result, componentMap)

	return result
}

const componentsMap = reduce(components.files, pathsToObject, {})

const fixturesMap = fixtures ? reduce(fixtures.files, (result, path) => {

	const pathArr = createPathArray(path)

	const fixtureMap = reduce(pathArr, (res, part) => {
		if ( isFile(part) ) {
			const name = removeExt(part)
			return {
				fixtures: {
					[name]: {
						path,
						name,
						props: {}
					},
				}
			}
		} else {
			return { [part]: res }
		}
	}, {})

	return merge(result, fixtureMap)
}, {}) : {}

module.exports = merge({}, componentsMap, fixturesMap)
