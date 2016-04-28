'use strict';

import {compose, createStore} from 'redux';
import reducer from './reducers';

let configureStore

configureStore = initialState => createStore(reducer, initialState);
// if ( process.env.BABEL_ENV === 'test' ) {
// } else {
// 	configureStore = initialState => createStore(reducer, initialState, compose(
// 		window.devToolsExtension ? window.devToolsExtension() : undefined
// 	));
// }

export default configureStore();
