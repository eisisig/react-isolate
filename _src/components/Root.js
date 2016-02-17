'use strict';

import React, {PropTypes} from 'react';
import {render} from 'react-dom';

import App from './App';

/**
 * Render App Component
 */
render(<App />, document.getElementById('root'));

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
