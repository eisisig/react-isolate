'use strict';

import React, { PropTypes } from 'react';

const Icon = ( { name, className, ...rest } ) => <i className="Icon" />;

Icon.defaultProps = {
	name: null
};

Icon.propTypes = {
	name: PropTypes.string.isRequired
};

export default Icon;
