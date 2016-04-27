'use strict'

const path = require('path')
const webpack = require('webpack')
const omit = require('lodash/omit')
const argv = require('minimist')(process.argv.slice(2))

const cwd = process.cwd()
const merge = require('webpack-merge')
const config = require('./config')

const NODE_ENV = process.env.NODE_ENV || argv.env || 'development'
const PORT = process.env.PORT || argv.port || 9999

const resolvePath = (userPath) => cwd + '/' + userPath || ''

let common = {
	devtool: 'cheap-module-source-map',
	entry: {
		isolate: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:9999',
			'webpack/hot/only-dev-server',
			path.resolve(__dirname, 'isolate-src', 'index.js'),
		]
	},
	output: {
		path: path.resolve(__dirname, 'isolate-bundles'),
		filename: '[name].bundle.js',
		publicPath: '/'
	},
	resolve: {
		modules: [
			path.resolve(__dirname, 'node_modules'),
			path.resolve(process.cwd(), 'node_modules'),
			'node_modules',
			config.componentsPath,
			config.fixturesPath,
		],
		alias: {
			'lodash/object/assign': 'lodash/assign',
			'lodash/array/difference': 'lodash/difference',
			COMPONENTS_PATH: resolvePath(config.componentsPath),
		},
		extensions: ['', '.js', '.jsx']
	},
	resolveLoader: {
		modulesDirectories: [
			path.resolve(process.cwd(), 'node_modules'),
			path.resolve(__dirname, 'node_modules'),
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
			{
				test: /\.css$/,
				include: [
					path.resolve(__dirname, 'isolate-src'),
				],
				loaders: [
					'style?sourceMap',
					'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
				]
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
		new webpack.IgnorePlugin(/\/_.+\//),
		new webpack.DefinePlugin({
			__ISOLATE__: JSON.stringify(omit(config, ['webpackConfig'])),
			'process.env': {
				'NODE_ENV': JSON.stringify(NODE_ENV)
			}
		})
	]
}

if ( 'webpackConfig' in config ) {
	const webpackConfig = config.webpackConfig
	common = merge(common, webpackConfig)
	if ( 'smart' in webpackConfig ) {
		common = merge.smart(common.module.loaders, webpackConfig.smart)
	}
}

// console.log(JSON.stringify(common, null, 4))

module.exports = common
module.exports.PORT = PORT
