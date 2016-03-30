'use strict';

import {handleActions} from 'redux-actions';
import assign from 'lodash.assign';
import componentMap from '../componentMap';
import appConfig from '../../isolate.config';
import * as c from './constants';

const initialState = {
	appConfig: appConfig,
	componentMap: componentMap,
	searchQuery: null,
	searchResults: null,
	url: window.location.pathname
};

export default handleActions({
	// Navigate
	[c.NAVIGATE]: (state, { payload }) => {
		return assign({}, state, { url: payload });
	},
	//Search
	[c.SEARCH]: (state, { payload }) => {
		return assign({}, state, {
			searchQuery: payload,
			searchResults: {
				'Test': {}
			}
		});
	},
	// Clear search
	[c.SEARCH_CLEAR]: (state) => {
		return assign({}, state, {
			searchQuery: null,
			searchResults: null
		});
	}
}, initialState);
