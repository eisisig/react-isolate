'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';

import SidebarComponentMenu from './SidebarComponentMenu';

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props }) => {
	return (
		<aside className="Sidebar">
			{/* <header>react isolate</header> */}
			{/* <section>Search</section> */}
			<SidebarComponentMenu { ...props } />
		</aside>
	)
});

/**
 * Export
 */
export default stitch({ render });
