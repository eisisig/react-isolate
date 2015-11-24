'use strict';

import React, { PropTypes } from 'react';
import cx from 'suit-cx';

const Icon = ( { name, className, ...rest } ) => <i className={ cx({ name: 'Icon', modifiers: ['name'] }, { ...rest }, className) } />;

Icon.defaultProps = {
	name: null
};

Icon.propTypes = {
	name: PropTypes.string.isRequired
};

export default Icon;
