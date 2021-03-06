'use strict';

import React, {PropTypes} from 'react';
import orderBy from 'lodash/orderBy';
import PureComponent from 'react-pure-render/component';
import styles from '../../isolate-styles/components/PropList.less';
import ui from '../../isolate-styles/ui.less';

/**
 * # PropList
 * @class PropList
 */
export default class PropList extends PureComponent {

	static propTypes = {
		docs: PropTypes.object
	};

	static defaultProps = {
		docs: null
	};

	sortProps = ( props ) => {
		return orderBy(Object.keys(props).map(( prop ) => ({
			name: prop,
			...props[prop]
		})), ['required', 'name'], ['desc']);
	};

	getType = ( prop ) => {
		return prop.type ? prop.type.name : null;
	};

	getDefault = ( prop ) => {
		if ( !prop.defaultValue ) return null;
		return <span className={ ui.code }>{ prop.defaultValue.value }</span>;
	};

	getTypeValues = ( prop ) => {

		if ( !prop.hasOwnProperty('value') && !prop.hasOwnProperty('type') ) return null;

		const { value, name: type, raw } = prop.type;

		// shape
		if ( value && ( type === 'shape'  ) ) {
			return Object.keys(value).map(( key, i ) => <span key={ i } className={ ui.code }>{ `${key}<${value[key].name}>` }</span>);
		}
		// arrayOf
		else if ( value && ( type === 'arrayOf' ) ) {
			return <span>[<span className={ ui.code }>{`<${value.name}>`}</span>,...]</span>;
		}
		// enum, union
		else if ( value && ( type === 'enum' || type === 'union' ) ) {
			return (
				<span className={ ui.code }>
					{ value.map(( en, i ) => `${ en.name || en.value}`.replace(/'/gmi, '')).join(', ') }
				</span>
			);
		}
		// instanceOf
		else if ( value && ( type === 'instanceOf' ) ) {
			return <span className={ ui.codet }>{ `${value}()` }</span>;
		}
		// custom
		else if ( type === 'custom' ) {
			return <span className={ ui.code }>{ raw }</span>;
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
				{/*
				 <div>
				 <h3 className={ ui.header }>Description</h3>
				 <div dangerouslySetInnerHTML={{ __html: currentDocs.description }}></div>
				 </div>
				 <h1>{ currentComponent.name }</h1>
				 */}
				{ currentDocs.props ? (
					<div>
						<h3 className={ ui.header }>Props</h3>
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
										<td><em><span className={ ui.code }>{ this.getType(prop) }</span></em></td>
										<td>{ this.getTypeValues(prop) }</td>
										<td>{ this.getDefault(prop) }</td>
										<td>{ prop.description }</td>
									</tr>
								);
							}) }
							</tbody>
						</table>
					</div>

				) : null }
			</div>
		);
	}
}
