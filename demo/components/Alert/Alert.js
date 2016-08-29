'use strict';

import React, {PropTypes} from 'react';
import cx from 'suit-cx';

/**
 * # Alert
 */
export class Alert extends React.Component {

	static defaultProps = {
		icon: 'question',
		title: '',
		message: '',
		disabled: null,
		// kind: 'default',
		// child: null,
		// metadata: {},
		// linkedId: [1, 6],
		// accountId: 246,3
		// comments: ['qwe'],
	};

	static propTypes = {
		/** This is the message */
		title: PropTypes.string,
		message: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
		disabled: PropTypes.bool,
		/** Add branding colors to alert */
		// kind: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'info', 'error']),
		// child: PropTypes.oneOfType([
		// 	PropTypes.string,
		// 	PropTypes.bool,
		// 	PropTypes.func,
		// ]),
		// metadata: PropTypes.shape({
		// 	desc: PropTypes.string,
		// 	count: PropTypes.number,
		// }),
		// linkedIds: PropTypes.arrayOf(React.PropTypes.number),
		// /** The owners id */
		// accountId: PropTypes.number.isRequired,
		// comments: PropTypes.arrayOf([
		// 	PropTypes.string
		// ]),
	};

	render () {
		const { title, message, icon, className, style, children } = this.props;

		const classes = cx({
			name: 'Alert',
			modifiers: ['icon', 'primary', 'secondary', 'success', 'warning', 'danger', 'disabled', 'withIcon']
		}, { withIcon: icon !== null, ...this.props }, className);

		return (
			<div className={ classes() } style={ style }>
				<If condition={ title }>
					{ title }
				</If>
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
