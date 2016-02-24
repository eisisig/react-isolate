'use strict';

const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();
const merge = require('webpack-merge');
const config = require('./isolate.config');

const TARGET = process.env.npm_lifecycle_event;
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 9999;

const resolvePath = (userPath) => cwd + '/' + userPath;

let common = {
	devtool: 'eval',
	entry: [
		path.resolve(__dirname, 'isolate-src', 'index.js')
	],
	output: {
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		alias: {
			COMPONENTS_PATH: resolvePath(config.componentsPath)
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
					path.resolve(process.cwd(), 'src'),
					path.resolve(process.cwd(), 'demo'),
				],
				// exclude: [
				// 	/_.+?\//
				// ]
			},
		]
	},
	plugins: [
		new webpack.IgnorePlugin(/\/_.+\//),
		new webpack.NoErrorsPlugin()
	]
};

if ( TARGET === 'build' ) {
	common = merge(common, {});
}

if ( 'webpack' in config ) {
	common = merge(common, config.webpack);
}

module.exports = common;
