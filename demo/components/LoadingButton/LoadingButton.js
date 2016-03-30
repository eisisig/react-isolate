'use strict';

import React, {PropTypes} from 'react';

/**
 * # Button
 */
export default class LoadingButton extends React.Component {

	static propTypes = {
		value: PropTypes.string.isRequired,
		loadingText: PropTypes.string,
		loading: PropTypes.bool,
		onClick: PropTypes.func,
	};

	static defaultProps = {
		value: null,
		loadingText: 'Loading...',
		loading: false,
		onClick: () => {},
	};

	state = {
		loading: this.props.loading
	};

	handleClick = () => {
		this.setState({
			loading: !this.state.loading
		}, this.props.onClick);
	};

	render () {
		const { loading } = this.state;
		const { value, loadingText } = this.props;
		return (
			<button onClick={ this.handleClick }>{ loading ? loadingText : value }</button>
		);
	}
}
