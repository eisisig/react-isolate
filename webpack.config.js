'use strict';

const path = require('path');
const webpack = require('webpack');
const omit = require('lodash/omit');
const argv = require('minimist')(process.argv.slice(2));

const cwd = process.cwd();
const merge = require('webpack-merge');
const config = require('./isolate.config');

const NODE_ENV = process.env.NODE_ENV || argv.env || 'development';
const PORT = process.env.PORT || argv.port || 9999;

const resolvePath = (userPath) => cwd + '/' + userPath || '';

let common = {
	devtool: '#@eval',
	entry: [
		path.resolve(__dirname, 'isolate-src', 'index.js')
	],
	output: {
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		alias: {
			CUSTOM_CONFIG: resolvePath('isolate.config.js'),
			COMPONENTS_PATH: resolvePath(config.componentsPath),
			FIXTURES_PATH: resolvePath(config.fixturesPath),
		},
		modulesDirectories: [
			path.resolve(__dirname, 'node_modules'),
			path.resolve(process.cwd(), 'node_modules')
		],
		extensions: ['', '.js', '.jsx']
	},
	resolveLoader: {
		modulesDirectories: [
			path.resolve(process.cwd(), 'node_modules')
		]
	},
	module: {
		loaders: [
			{
				test: /\.md$/,
				loader: 'raw!markdown'
			},
			{
				test: /\.js$/,
				loader: 'babel?' + JSON.stringify(Object.assign({
					babelrc: false,
					presets: ['es2015-webpack', 'stage-0', 'react'],
					plugins: [
						'jsx-control-statements',
						'transform-decorators-legacy'
					],
					env: {
						development: {
							plugins: [
								['react-transform', {
									transforms: [
										{
											transform: 'react-transform-hmr',
											imports: ['react'],
											locals: ['module']
										}
									]
								}]
							]
						}
					},
				})),
				include: [
					path.resolve(__dirname, 'isolate-src'),
					resolvePath(config.componentsPath)
				],
				// exclude: [
				// 	/_.+?\//
				// ]
			},
		]
	},
	plugins: [
		new webpack.IgnorePlugin(/\/_.+\//),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			__ISOLATE__: JSON.stringify(omit(config, ['webpackConfig'])),
			'process.env': {
				'NODE_ENV': JSON.stringify(NODE_ENV)
			}
		})
	]
};

if ( 'webpackConfig' in config ) {
	common = merge(common, config.webpack);
}

module.exports = common;
