'use strict';

import {createAction} from 'redux-actions';
import * as c from './constants';

/**
 * Actions
 */
export const navigate = createAction(c.NAVIGATE);
export const search = createAction(c.SEARCH);
export const searchClear = createAction(c.SEARCH_CLEAR);
export const setComponent = createAction(c.SET_COMPONENT);
export const setFixture = createAction(c.SET_FIXTURE);
export const setViewState = createAction(c.SET_VIEW_STATE);
