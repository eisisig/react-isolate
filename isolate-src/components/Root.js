'use strict';

import React from 'react';
import {Provider} from 'react-redux';
import App from './App'

let hmrKey = Math.random();

const Root = ({ store, history }) => (
	<Provider store={store}>
		<App />
	</Provider>
);

if ( module.hot ) {
	hmrKey = Math.random();
}

export default Root;
