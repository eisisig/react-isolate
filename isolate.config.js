'use strict';

const path = require('path');
const omit = require('lodash/omit');
const merge = require('lodash/merge');
const assign = require('lodash/assign');
const argv = require('minimist')(process.argv.slice(2));

const defaultConfig = {
	title: 'React Isolate',
	showSearch: true,
	showPropDocs: true,
	showMarkdownDocs: true,
	showComponentPreview: true,
	showMarkupPreview: true,
	showPropEditor: true,
	host: 'localhost',
	port: 9999,
	outputPath: '/bundles/',
	fixturesPath: 'demo/fixtures',
	componentsPath: 'demo/components'
};

let config = assign({}, defaultConfig, omit(argv, ['_']));

if ( process.cwd() !== __dirname ) {
	try {
		merge(config, require('CUSTOM_CONFIG'), omit(argv, ['_']));
	} catch ( e ) {}
}

module.exports = config;
