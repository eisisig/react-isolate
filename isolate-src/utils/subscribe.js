'use strict'

import history from './history'
import store from '../store'
import {setComponent} from '../actions'

let url

function handleUrlChange () {

	let prevUrl = url

	url = store.getState().url

	if ( prevUrl && prevUrl !== url || !prevUrl && !!url ) {
		history.push({ pathname: url })
		store.dispatch(setComponent(url))
	}
}

let unsubscribe = store.subscribe(handleUrlChange)

handleUrlChange()
