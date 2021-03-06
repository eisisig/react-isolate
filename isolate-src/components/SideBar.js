'use strict';

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import PureComponent from 'react-pure-render/component';

import ui from '../../isolate-styles/ui.less';
import styles from '../../isolate-styles/components/SideBar.less';

/**
 * SideBar
 * @class SideBar
 */
export default class SideBar extends PureComponent {

	state = {
		filteredList: null
	};

	handleSearch = ( e ) => {
		const { components } = this.props;
		const value = e.target.value.toLowerCase();

		let filtered = _.filter(components, ( item ) => {
			if ( item.name.toLowerCase().indexOf(value) !== -1 ) {
				return item;
			}
			return _.find(item.components, ( item ) => {
				return item.name.toLowerCase().indexOf(value) !== -1;
			});
		});

		if ( filtered ) {
			this.setState({
				filteredList: _.indexBy(filtered, 'name')
			});
		}

		if ( !value ) {
			this.handleClearSearch();
		}
	};

	handleClearSearch = ( e ) => {
		this.refs.search.value = '';
		this.setState({ filteredList: null });
	};

	renderSearch = () => {
		const { filteredList } = this.state;
		return (
			<div>
				<input className={ styles.searchInput } ref="search" type="text" placeholder="Filter components" onChange={ this.handleSearch } />
				{ filteredList ? (
					<button className={ styles.searchClear } onClick={ this.handleClearSearch }>X</button>
				) : null }
			</div>
		);
	};

	getFirstFixtureName ( fixtures ) {
		const keys = _.keys(fixtures);
		if ( keys.length > 1 && keys[1] != 'defaultProps' ) return keys[1];
		return keys[0];
	}

	renderList = ( componentList ) => {
		const { location: { pathname } } = this.props;
		const pathArr = pathname.split('/');
		return (
			<ul className={ styles.componentList }>
				{ _.map(componentList, ( component, i ) => {
					const hideHeader = Object.keys(component.components).length <= 1 && Object.keys(component.components)[0].toLowerCase() !== 'demo';
					return (
						<li key={ i } className={ styles.componentListItem }>
							{ !hideHeader ? (
								<h1 className={ `${ styles.componentHeader }` }>{ component.name }</h1>
							) : null }
							{ component.components ? (
								<ul className={ styles.subList }>
									{ _.map(component.components, ( subComponent, i ) => {
										const totalFixtures = subComponent.fixtures ? Object.keys(subComponent.fixtures).length - 1 : null;
										const defaultComponentName = this.getFirstFixtureName(subComponent.fixtures);
										const path = `/${component.name}/${subComponent.name}/` + defaultComponentName;
										const current = pathArr[0] === component.name && pathArr[1] === subComponent.name;

										//const firstLink = subComponent.fixtures ? subComponent.fixtures[Object.keys(subComponent.fixtures)[0]] : null;
										return (
											<li key={ i } className={ styles.subList }>
												<Link className={ `${ styles.subLink } ${ current ? styles.subLinkCurrent: '' }` }
												      to={ path }>
													{ subComponent.name }
													{ totalFixtures ? <span className={ ui.badge }>{ totalFixtures }</span> : null }
												</Link>
												{ current && subComponent.fixtures && Object.keys(subComponent.fixtures).length > 1 ? (
													<ul className={ styles.fixtureList }>
														{ _.map(subComponent.fixtures, ( fixture, i ) => {
															if ( fixture.name !== 'defaultProps' ) {
																const path = `/${component.name}/${subComponent.name}/${fixture.name}`;
																const current = pathArr[0] === component.name && pathArr[1] === subComponent.name && pathArr[2] === fixture.name;
																return (
																	<li key={ i } className={ styles.fixtureListItem }>
																		<Link
																			className={ `${ styles.fixtureLink } ${ current ? styles.fixtureLinkCurrent : '' }` }
																			to={ path }>
																			{ fixture.name }
																		</Link>
																	</li>
																);
															}
														}) }
													</ul>
												) : null }
											</li>
										);
									}) }
								</ul>
							) : null }
						</li>
					);
				}) }
			</ul>
		);
	};

	render () {
		const { components } = this.props;
		const { filteredList } = this.state;
		return (
			<div className={ styles.wrapper }>
				<Link to="/" className={ styles.title } to="/"></Link>
				<div className={ styles.search }>{ this.renderSearch() }</div>
				<div className={ styles.list }>{ this.renderList(filteredList || components) }</div>
			</div>
		);
	}
}
