'use strict';

import React from 'react';
import {render} from 'react-dom';

import App from './components/App';
import componentMap from './componentMap';
import appConfig from '../isolate.config';

// console.log(JSON.stringify(componentMap, null, 4));

render(<App componentMap={ componentMap } appConfig={ appConfig } />, document.getElementById('root'));
