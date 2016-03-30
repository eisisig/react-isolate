'use strict';

import history from './history';
import store from './store';

let url;

function handleUrlChange () {
	let prevUrl = url;
	url = store.getState().url;
	if ( prevUrl && prevUrl !== url ) {
		history.push({
			pathname: url,
			// search: query ? path.format({ query: query }) : null
		});
		console.info('Url change from', prevUrl, 'to', url);
	}
}

let unsubscribe = store.subscribe(handleUrlChange);

handleUrlChange();
