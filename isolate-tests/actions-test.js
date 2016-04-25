'use strict'

import test from 'ava'

import {navigate, search, searchClear, setComponent, setFixture} from '../isolate-src/actions'

test('navigate', t => t.deepEqual(navigate('/path/to/go'), { type: 'NAVIGATE', payload: '/path/to/go' }))
test('set fixture', t => t.deepEqual(setFixture(), { type: 'SET_FIXTURE', payload: null }))
test('set component', t => t.deepEqual(setComponent(), { type: 'SET_COMPONENT', payload: null }))
test('search', t => t.deepEqual(search('alert'), { type: 'SEARCH', payload: 'alert' }))
test('search clear', t => t.deepEqual(searchClear(), { type: 'SEARCH_CLEAR', payload: undefined }))
