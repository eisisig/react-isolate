'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'
import {AppContainer} from 'react-hot-loader'
import store from './store'

import './utils/subscribe'

const rootElement = document.getElementById('root')

ReactDOM.render(
	<AppContainer>
		<Root store={ store } />
	</AppContainer>,
	rootElement
);

if ( module.hot ) {
	// module.hot.accept('./components/Root', () => renderApp());
	module.hot.accept(() => renderApp())
}

function renderApp () {
	const NextApp = require('./components/Root').default
	ReactDOM.render(
		<AppContainer>
			<NextApp store={ store } />
		</AppContainer>,
		rootElement
	);
}

