'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';

import ComponentMenu from './ComponentMenu';
import SearchInput from './SearchInput';

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props }) => {
	return (
		<aside className="Sidebar">
			<SearchInput onSearch={ props.onSearch } onSearchClear={ props.onSearchClear } />
			<ComponentMenu { ...props } />
		</aside>
	);
});

/**
 * Export
 */
export default stitch({ render });
