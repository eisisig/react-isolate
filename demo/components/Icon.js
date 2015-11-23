'use strict';

import React, { PropTypes } from 'react';

const Icon = ( { name, classes } ) => <i className={ classes }>{ name }</i>;

Icon.defaultProps = {
	name: null,
	size: 'lg',
	iconPrefix: 'menicon--'
};

Icon.propTypes = {
	name: PropTypes.oneOf([
		'closeSoftRoundNeg',
		'up',
	]).isRequired,
	size: PropTypes.oneOf(['xs', 'sm', 'lg', 'xl']),
	iconPrefix: PropTypes.string
};

export default Icon;
