'use strict'

const path = require('path')
const webpack = require('webpack')
const omit = require('lodash/omit')
const argv = require('minimist')(process.argv.slice(2))
const SplitByPathPlugin = require('webpack-split-by-path')

const cwd = process.cwd()
const merge = require('webpack-merge')
const config = require('./isolate.config')

const NODE_ENV = process.env.NODE_ENV || argv.env || 'development'
const PORT = process.env.PORT || argv.port || 9999

const resolvePath = (userPath) => cwd + '/' + userPath || ''

let common = {
	// devtool: '#@eval',
	devtool: 'cheap-module-eval-source-map',
	entry: {
		app: [
			'webpack-dev-server/client?http://localhost:9999',
			'webpack/hot/only-dev-server',
			'react-hot-loader/patch',
			path.resolve(__dirname, 'isolate-src', 'index.js'),
		]
	},
	output: {
		path: path.resolve(__dirname, 'isolate-bundles'),
		filename: '[name].bundle.js',
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
				loader: 'babel',
				include: [
					path.resolve(__dirname, 'isolate-src'),
					resolvePath(config.componentsPath)
				],
			},
		]
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new SplitByPathPlugin([
			{ name: 'isolate', path: path.join(__dirname) }
		]),
		new webpack.IgnorePlugin(/\/_.+\//),
		new webpack.DefinePlugin({
			__ISOLATE__: JSON.stringify(omit(config, ['webpackConfig'])),
			'process.env': {
				'NODE_ENV': JSON.stringify(NODE_ENV)
			}
		})
	]
}

// if ( 'webpackConfig' in config ) {
// 	const webpackConfig = config.webpackConfig
// 	common = merge(common, webpackConfig)
// 	if ( 'smart' in webpackConfig ) {
// 		common = merge.smart(common.module.loaders, webpackConfig.smart)
// 	}
// }

module.exports = common
module.exports.PORT = PORT
