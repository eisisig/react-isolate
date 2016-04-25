'use strict'

import {handleActions} from 'redux-actions'
import assign from 'lodash.assign'
import componentMap from '../componentMap'
import {urlToComponent} from '../utils/urlToComponent'
import appConfig from '../../isolate.config'
import * as c from '../constants'

console.log('urlToComponent', urlToComponent)

const initialState = {
	appConfig: appConfig,
	componentMap: componentMap,
	searchQuery: '',
	searchResults: null,
	selectedComponent: null,
	selectedFixture: null,
	url: typeof window !== 'undefined' ? window.location.pathname : ''
}

export default handleActions({
	// Navigate
	[c.NAVIGATE]: (state, { payload }) => {
		return assign({}, state, { url: payload })
	},
	//Search
	[c.SEARCH]: (state, { payload }) => {
		return assign({}, state, {
			searchQuery: payload,
			searchResults: {
				'Test': {}
			}
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
		console.log('payload', payload)
		const data = urlToComponent(payload, state.componentMap)
		return assign({}, state, data)
	},
}, initialState)
