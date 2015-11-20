'use strict';

import React, { PropTypes } from 'react';

/**
 * # TestList
 */
export default class TestList extends React.Component {

	static propTypes = {
		tests: PropTypes.array
	};

	static defaultProps = {
		tests: []
	};

	handleRun = () => {
		const { tests } = this.props;
		alert('Should call ' + tests.fileName);
	};

	render () {
		const { tests } = this.props;
		const style = {
			height: '300px',
			width: '100%'
		};

		return (
			<div className="TestList">
				<h3>Tests { tests.asserts && tests.asserts.length ? <button onClick={ this.handleRun }>Run</button> : null }</h3>
				{ tests.asserts.length ? (
					<div>
						<ol>
							{ tests.asserts.map(( test, i ) => {
								return <li key={ i }>{ test }</li>;
							}) }
						</ol>
						<iframe style={ style } src="/runTest" frameBorder="1"></iframe>
					</div>
				) : (
					<div className="Error">No tests found!</div>
				) }
			</div>
		);
	}
}
