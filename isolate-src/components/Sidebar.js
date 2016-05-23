'use strict'

import React, {PropTypes} from 'react'
import {stitch} from 'keo'

import ComponentMenu from './ComponentMenu'
import SearchInput from './SearchInput'

const displayName = 'Sidebar'

const render = () => {
	return (
		<aside className="Sidebar">
			<SearchInput />
			<ComponentMenu />
		</aside>
	)
}

/**
 * Export
 */
export default stitch({ displayName, render })
