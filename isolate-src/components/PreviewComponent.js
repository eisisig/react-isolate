'use strict';

import React, {PropTypes} from 'react';

/**
 * @class PreviewComponent
 */
export class PreviewComponent extends React.Component {

	static propTypes = {};

	static defaultProps = {};

	//componentWillMount () {}
	//componentDidMount () {}
	//componentWillUnmount () {}
	//shouldComponentMount () { return true; }

	render () {
		const { component } = this.props;
		return (
			<div className="PreviewComponent">
				<pre>
				{ JSON.stringify(component, null, 4) }
				</pre>
			</div>
		);
	}
}

export default PreviewComponent;
