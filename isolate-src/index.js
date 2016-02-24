'use strict';

import React, {PropTypes} from 'react';
import {render} from 'react-dom';

import App from './components/App';
import componentMap from './componentMap';
import appConfig from '../isolate.config';

// console.log(JSON.stringify(componentMap, null, 4));

/**
 * Render App Component
 */
render(
	<App componentMap={ componentMap } appConfig={ appConfig } />,
	document.getElementById('root')
);

/*
 <Router history={ history }>
 <Route path="/" component={ App } appData={ appData }>
 <Route path=":component" component={ Documentation }>
 <Route path=":sub">
 <Route path=":fixture" component={ Preview } />
 </Route>
 </Route>
 </Route>
 </Router>
 */
