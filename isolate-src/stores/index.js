'use strict';

import {compose, createStore} from 'redux';
import reducer from '../reducers';

let configureStore

if ( process.env.BABEL_ENV === 'test' ) {
	configureStore = initialState => createStore(reducer, initialState);
} else {
	configureStore = initialState => createStore(reducer, initialState, compose(
		window.devToolsExtension ? window.devToolsExtension() : undefined
	));
}

export default configureStore();
