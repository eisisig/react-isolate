'use strict';

import React, { PropTypes } from 'react';
import cx from 'suit-cx';

/**
 * # Alert
 */
export class Alert extends React.Component {

	static defaultProps = {
		icon: null,
		message: null,
		danger: null,
		warning: null,
		success: null,
		disabled: null,
		help: null,
		primary: null,
		secondary: null
	};

	static propTypes = {
		/**
		 * The alerts message
		 */
		message: PropTypes.string,
		icon: PropTypes.string,
		primary: PropTypes.bool,
		secondary: PropTypes.bool,
		success: PropTypes.bool,
		danger: PropTypes.bool,
		warning: PropTypes.bool,
		disabled: PropTypes.bool,
		help: PropTypes.bool
	};

	render () {
		const { message, icon, className, style, children } = this.props;

		const classes = cx({
			name: 'Alert',
			modifiers: ['icon', 'primary', 'secondary', 'success', 'warning', 'danger', 'disabled', 'withIcon']
		}, { withIcon: icon !== null, ...this.props }, className);

		return (
			<div className={ classes() } style={ style }>
				<div>Alert:</div>
				<If condition={ message }>
					{ message }
				</If>
				<If condition={ children }>
					{ children }
				</If>
			</div>
		);
	}
}

export default Alert;
