'use strict';

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

import ui from '../_styles/ui.less';
import styles from '../_styles/components/SideBar.less';

/**
 * SideBar
 * @class SideBar
 */
//import analyzeRender from '../_lib/analyzeRender';
//@analyzeRender
export default class SideBar extends React.Component {

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

	renderList = ( componentList ) => {
		const { location: { pathname } } = this.props;
		const pathArr = pathname.split('/');
		return (
			<ul className={ styles.componentList }>
				{ _.map(componentList, ( component, i ) => {
					//const path = `/${component.name}`;
					return (
						<li key={ i } className={ styles.componentListItem }>
							<h1 className={ `${ styles.componentHeader }` }>{ component.name }</h1>
							{ component.components ? (
								<ul className={ styles.subList }>
									{ _.map(component.components, ( subComponent, i ) => {
										let path = `/${component.name}/${subComponent.name}`;
										const current = pathArr[0] === component.name && pathArr[1] === subComponent.name;
										const totalFixtures = subComponent.fixtures ? Object.keys(subComponent.fixtures).length : null;
										const firstLink = subComponent.fixtures ? subComponent.fixtures[Object.keys(subComponent.fixtures)[0]] : null;
										if ( firstLink ) { path += `/${firstLink.name}`; }
										if ( subComponent.fixtures ) {
											return (
												<li key={ i } className={ styles.subList }>
													<Link className={ `${ styles.subLink } ${ current? styles.subLinkCurrent: '' }` }
													      to={ path }>
														{ subComponent.name }
														{ totalFixtures ? <span className={ ui.badge }>{ totalFixtures }</span> : null }
													</Link>
													{ current && subComponent.fixtures ? (
														<ul className={ styles.fixtureList }>
															{ _.map(subComponent.fixtures, ( fixture, i ) => {
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
															}) }
														</ul>
													) : null }
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
		);
	};

	render () {
		const { components } = this.props;
		const { filteredList } = this.state;
		return (
			<div className={ styles.wrapper }>
				<div className={ styles.search }>{ this.renderSearch() }</div>
				<div className={ styles.list }>{ this.renderList(filteredList || components) }</div>
			</div>
		);
	}
}
