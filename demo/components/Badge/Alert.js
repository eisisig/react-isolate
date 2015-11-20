'use strict';

import React, { PropTypes } from 'react';

/**
 * # Alert
 */
export default class Alert extends React.Component {

	static propTypes = {
		/**
		 * Value of the alert. This is the main text
		 */
		value: PropTypes.string.isRequired,

		/**
		 * Type of Alert. The colors change depending on this
		 */
		type: PropTypes.oneOf(['default', 'success', 'info'])
	};

	static defaultProps = {
		value: null,
		type: 'default'
	};

	render () {
		const { value, children } = this.props;
		return (
			<div className="Alert">{ value || children }</div>
		);
	}
}
