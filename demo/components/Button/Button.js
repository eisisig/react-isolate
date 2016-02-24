'use strict';

import React, { PropTypes } from 'react';

/**
 * # Button
 */
export default class Button extends React.Component {

	static propTypes = {
		/**
		 * This is the main value
		 */
		value: PropTypes.string.isRequired,
		/**
		 * Shape
		 */
		optionalShape: PropTypes.shape({
			onLoad: PropTypes.func,
			onSliceClick: PropTypes.func,
			onSliceHover: PropTypes.func
		}),
		optionalObjectOf: PropTypes.objectOf(PropTypes.number),
		optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
		optionalUnion: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.instanceOf(Date)
		]),
		optionalEnum: PropTypes.oneOf(['News', 'Photos']),
		optionalMessage: PropTypes.instanceOf(Date)
	};

	static defaultProps = {
		value: 'Default value'
	};

	render () {
		const { value } = this.props;
		return (
			<button className="Button">{ value }</button>
		);
	}
}
