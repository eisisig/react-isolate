'use strict'

import {handleActions} from 'redux-actions'
import merge from 'lodash/merge'
import forEach from 'lodash/forEach'
import assign from 'lodash/assign'
import componentMap from './componentMap'
import {urlToComponent, findComponents} from './utils'
import appConfig from '.././isolate.config'
import * as c from './constants'

console.log(componentMap)
// console.log(JSON.stringify(componentMap, null, 4))

const initialState = {
	appConfig: appConfig,
	componentMap: componentMap,
	searchQuery: '',
	searchResults: null,
	selectedComponent: null,
	selectedFixture: null,
	viewState: {
		showPreview: localStorage.getItem('showPreview') !== 'false',
		showMarkup: localStorage.getItem('showMarkup') !== 'false',
		showEditor: localStorage.getItem('showEditor') !== 'false',
		showSpec: localStorage.getItem('showSpec') !== 'false',
		showDoc: false,
		// showDoc: localStorage.getItem('showDoc') !== 'false',
	},
	url: typeof window !== 'undefined' ? window.location.pathname : ''
}

export default handleActions({
	// Navigate
	[c.NAVIGATE]: (state, { payload }) => {
		return assign({}, state, { url: payload })
	},
	//Search
	[c.SEARCH]: (state, { payload }) => {
		const found = findComponents(payload, state.componentMap)
		return assign({}, state, {
			searchQuery: payload,
			searchResults: found,
		})
	},
	// Clear search
	[c.SEARCH_CLEAR]: (state) => {
		return assign({}, state, {
			searchQuery: initialState.searchQuery,
			searchResults: initialState.searchResults,
		})
	},
	// Set component
	[c.SET_COMPONENT]: (state, { payload }) => {
		const data = urlToComponent(payload, state.componentMap)
		return assign({}, state, data)
	},
	[c.SET_FIXTURE]: (state, { payload }) => {
		console.log('payload', payload)

		const newFixtures = assign({}, state.selectedFixture, { props: payload })

		return assign({}, state, { selectedFixture: newFixtures })
	},
	// Set view state
	[c.SET_VIEW_STATE]: (state, { payload }) => {
		forEach(payload, (val, key) => localStorage.setItem(key, val))
		return merge({}, state, { viewState: payload })
	},
}, initialState)
