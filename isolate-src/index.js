'use strict'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import Root from './components/Root'
import store from './store'
import {AppContainer} from 'react-hot-loader'

import './utils/subscribe'

const rootElement = document.getElementById('root')

render(
	<AppContainer
		component={Root}
		props={{ store }}
	/>,
	rootElement
);

if ( module.hot ) {
	module.hot.accept('./components/Root', () => {
		render(
			<AppContainer
				component={require('./components/Root').default}
				props={{ store, history }}
			/>,
			rootElement
		);
	});
}

