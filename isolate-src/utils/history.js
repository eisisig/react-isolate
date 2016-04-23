'use strict';

import {createHistory, useBasename} from 'history';

const history = useBasename(createHistory)({ basename: '/' });

export default history;
