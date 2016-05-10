'use strict'

import {compose, createStore} from 'redux'
import reducer from './reducers'

let configureStore

configureStore = initialState => createStore(reducer, initialState)

const store = configureStore()

if ( module.hot ) {
	// Enable Webpack hot module replacement for reducers
	module.hot.accept('./reducers', function () {
		const nextRootReducer = require('./reducers').default
		store.replaceReducer(nextRootReducer)
	})
}

export default store
