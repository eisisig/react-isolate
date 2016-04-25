'use strict';

import test from 'ava'
import {navigate, search, searchClear, setComponent, setFixture} from '../isolate-src/actions'

const proxyquire = require('proxyquire').noCallThru()

const stubs = {
	'../componentMap': {},
	'componentMap': {}
}

const store = proxyquire('../isolate-src/stores', stubs)
const reducer = proxyquire('../isolate-src/reducers', {
	'../componentMap': {},
})

test('app reducer handles navigate', t => {
	// const initialState = store.getState().url
	// store.dispatch(navigate('/path/to/go'))
	// const changedState = store.getState().url

	// t.equal(initialState, '')
})
