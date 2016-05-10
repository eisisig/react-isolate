'use strict'

import {handleActions} from 'redux-actions'
import get from 'lodash/get'
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
	[c.NAVIGATE]: ( state, { payload } ) => {
		return assign({}, state, { url: payload })
	},
	//Search
	[c.SEARCH]: ( state, { payload } ) => {
		return assign({}, state, {
			searchQuery: payload,
			searchResults: findComponents(payload, state.componentMap),
		})
	},
	// Clear search
	[c.SEARCH_CLEAR]: ( state ) => {
		return assign({}, state, {
			searchQuery: initialState.searchQuery,
			searchResults: initialState.searchResults,
		})
	},
	// Set component
	[c.SET_COMPONENT]: ( state, { payload } ) => {

		let component, fixture
		const selected = urlToComponent(payload, state.componentMap)
		const componentPath = get(selected, 'selectedComponent.path')
		const fixturePath = get(selected, 'selectedFixture.path')

		if ( componentPath ) {
			try {
				component = require('COMPONENTS_PATH/' + componentPath.slice(2))
				if ( component.hasOwnProperty('default') ) {
					component = component.default
				}
			} catch ( e ) {
				console.log('e', e)
			}
		}

		if ( fixturePath ) {
			try {
				fixture = require('COMPONENTS_PATH/' + fixturePath.slice(2))
				if ( fixture.hasOwnProperty('default') ) {
					fixture = fixture.default
				}
			} catch ( e ) {
				console.log('e', e)
			}
		}

		return assign({}, state, { selectedComponent: component, selectedFixture: fixture })
	},
	[c.SET_FIXTURE]: ( state, { payload } ) => {
		return assign({}, state, { selectedFixture: assign({}, state.selectedFixture, { props: payload }) })
	},
	// Set view state
	[c.SET_VIEW_STATE]: ( state, { payload } ) => {
		forEach(payload, ( val, key ) => localStorage.setItem(key, val))
		return merge({}, state, { viewState: payload })
	},
}, initialState)
