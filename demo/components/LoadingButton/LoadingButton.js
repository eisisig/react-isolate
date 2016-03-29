'use strict';

import React, {PropTypes} from 'react';

/**
 * # Button
 */
export default class LoadingButton extends React.Component {

	static propTypes = {
		value: PropTypes.string.isRequired,
		loadingText: PropTypes.string,
		initialLoading: PropTypes.bool,
		onClick: PropTypes.func,
	};

	static defaultProps = {
		value: null,
		loadingText: 'Loading...',
		initialLoading: false,
		onClick: () => {},
	};

	state = {
		loading: this.props.initialLoading
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
