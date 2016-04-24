'use strict';

import {compose, createStore} from 'redux';
import reducer from '../reducers';

const configureStore = (initialState) => createStore(reducer, initialState, compose(
	window.devToolsExtension ? window.devToolsExtension() : undefined
));

export default configureStore();
