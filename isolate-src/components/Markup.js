'use strict';

import React, {PropTypes} from 'react';
import {pipe, resolutionMap, stitch} from 'keo';
import {PrismCode} from "react-prism";
import renderMarkup from '../utils/renderMarkup';

const getDefaultProps = () => ({});

const shouldComponentUpdate = () => true;

/**
 * Render
 */
const render = pipe(resolutionMap, ({ props: { selectedComponent, selectedFixture } }) => {
	return (
		<code>
			<If condition={ selectedComponent }>
				 <PrismCode className="language-jsx">
					{ renderMarkup(selectedComponent.name, selectedFixture) }
				 </PrismCode>
			</If>
		</code>
	)
});

/**
 * Export
 */
export default stitch({
	getDefaultProps,
	shouldComponentUpdate,
	render
});
