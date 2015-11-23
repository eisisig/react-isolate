'use strict';

import React, { PropTypes } from 'react';

const Icon = ( props ) => {
	const classes = 'Testing this';
	return <i className={ classes }>{ classes }</i>;
};

Icon.defaultProps = {
	name: null,
	size: 'lg',
	iconPrefix: 'menicon--'
};

Icon.propTypes = {
	name: PropTypes.string.isRequired,
	size: PropTypes.oneOf(['xs', 'sm', 'lg', 'xl']),
	iconPrefix: PropTypes.string
};

export default Icon;
