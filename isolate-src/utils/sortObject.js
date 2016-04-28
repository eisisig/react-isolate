'use strict';

import keys from 'lodash/keys'
import flow from 'lodash/flow'
import reduce from 'lodash/fp/reduce'
import orderBy from 'lodash/orderBy'

export default function (obj) {
	return flow(keys, orderBy, reduce((r, k) => (r[k] = obj[k], r), {}))(obj)
}
