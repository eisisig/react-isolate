'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import './utils/subscribe'

const Root = require('./components/Root').default
const rootElement = document.getElementById('root')

let instance = ReactDOM.render(
	<Root />,
	rootElement
)

if ( module.hot ) {
	module.hot.accept(function () {
		const NextApp = require('./components/Root').default
		instance = ReactDOM.render(<NextApp />, rootElement)
	})
}
