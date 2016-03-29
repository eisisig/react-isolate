'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props, refs }) => {

	const clearInput = () => {
		refs.search.value = null;
		refs.search.focus();
		props.onSearchClear();
	};

	return (
		<div className="SearchInput">
			<input className="SearchInput-input" ref="search" onChange={ props.onSearch } type="text" placeholder="Search components/fixtures..." />
			<button className="SearchInput-button" onClick={ clearInput }>X</button>
		</div>
	)
});

/**
 * Export
 */
export default stitch({ render });
