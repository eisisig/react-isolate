'use strict';

import React, { PropTypes } from 'react';

/**
 * # Demo
 */
export default class Demo extends React.Component {

	static propTypes = {
		name: PropTypes.string
	};

	static defaultProps = {
		name: 'Demo name'
	};

	render () {
		return (
			<div className="Demo">Demo</div>
		);
	}
}
