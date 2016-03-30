'use strict';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {stitch} from 'keo';
import {search, searchClear} from '../redux/actions';

const mapStateToProps = state => ({ searchQuery: state.searchQuery });

const propTypes = {
	searchQuery: PropTypes.string
};

const render = ({ props }) => {

	// console.log('props', props);

	const onSearch = (e) => {
		const value = e.target.value;
		if ( value ) {
			props.dispatch(search(value));
		} else {
			props.dispatch(searchClear());
		}
	};

	const onClear = () => {
		props.dispatch(searchClear());
	};

	return (
		<div className="SearchInput">
			<input className="SearchInput-input" value={ props.searchQuery } onChange={ onSearch } type="text" placeholder="Search components/fixtures..." />
			<button className="SearchInput-button" onClick={ onClear }>X</button>
		</div>
	);
};

/**
 * Export
 */
export default connect(mapStateToProps)(stitch({ propTypes, render }));
