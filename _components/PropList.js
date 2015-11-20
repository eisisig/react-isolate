'use strict';

import React, { PropTypes } from 'react';
import styles from '../_styles/components/PropList.less';

/**
 * # PropList
 * @class PropList
 */
export default class PropList extends React.Component {

	static propTypes = {
		docs: PropTypes.object
	};

	static defaultProps = {
		docs: null
	};

	sortProps = ( props ) => {
		return _.sortByOrder(Object.keys(props).map(( prop ) => ({
			name: prop,
			...props[prop]
		})), ['required', 'name'], false);
	};

	getType = ( prop ) => {
		return prop.name || prop.type.name;
	};

	getTypeValues = ( prop ) => {

		if ( !prop.hasOwnProperty('value') ) return null;

		const { value, name: type, raw } = prop.type;

		// shape
		if ( value && ( type === 'shape'  ) ) {
			return Object.keys(value).map(( key, i ) => <span key={ i }><span className="iso-code-part">{ `${key}<${value[key].name}>` }</span>, </span>);
		}
		// arrayOf
		else if ( value && ( type === 'arrayOf' ) ) {
			return <span>[<span className="iso-code-part">{`<${value.name}>`}</span>,...]</span>;
		}
		// enum, union
		else if ( value && ( type === 'enum' || type === 'union' ) ) {
			return value.map(( en, i ) => <span key={ i }><span className="iso-code-part">{ `${ en.name || en.value}` }</span>, </span>);
		}
		// instanceOf
		else if ( value && ( type === 'instanceOf' ) ) {
			return <span className="iso-code-part">{ `${value}()` }</span>;
		}
		// custom
		else if ( type === 'custom' ) {
			return <span className="iso-code-part">{ raw }</span>;
		}
		else {
			//console.log('I fell through', 'type', type, 'value', value);
		}
	};

	render () {
		const { currentDocs, currentComponent, currentDocs: { props } } = this.props;

		if ( !props ) { return null; }

		const sortedProps = this.sortProps(props);

		return (
			<div className={ styles.wrapper }>
				<If condition={ currentDocs.description }>
					<div dangerouslySetInnerHTML={{ __html: currentDocs.description }}></div>
					<Else />
					<h1>{ currentComponent.name }</h1>
				</If>
				<If condition={ currentDocs.props }>
					<div>
						<h4 className="iso-h4">Props</h4>
						<table className="iso-table iso-table--bordered">
							<thead>
							<tr>
								<th>Name</th>
								<th>Type</th>
								<th>Values</th>
								<th>Default</th>
								<th>Description</th>
							</tr>
							</thead>
							<tbody>
							{sortedProps.map(( prop, i ) => {
								return (
									<tr key={ i } className={ `${prop.required ? 'is-required' : '' }` }>
										<td><strong>{ prop.name + (prop.required ? '*' : '') }</strong></td>
										<td><em>{ this.getType(prop) }</em></td>
										<td>{ this.getTypeValues(prop) }</td>
										<td>{ prop.defaultValue ? prop.defaultValue.value : null }</td>
										<td>{ prop.description }</td>
									</tr>
								);
							}) }
							</tbody>
						</table>
					</div>
				</If>
			</div>
		);
	}
}
