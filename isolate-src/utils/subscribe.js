'use strict'

import history from 'isolate/utils/history'
import store from 'isolate/stores'
import {setComponent} from 'isolate/actions'

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
