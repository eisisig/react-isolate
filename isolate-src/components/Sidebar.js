'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props: { onSetComponent } }) => {
	return (
		<aside className="Sidebar">
			<header>react isolate</header>
			<section>Search</section>
			<nav>Component List</nav>
		</aside>
	)
});

/**
 * Export
 */
export default stitch({ render });
