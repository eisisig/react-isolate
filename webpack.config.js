'use strict'

const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const omit = require('lodash/omit')
const argv = require('minimist')(process.argv.slice(2))

const cwd = process.cwd()
const merge = require('webpack-merge')
const config = require('./config')

const NODE_ENV = process.env.NODE_ENV || argv.env || 'development'
const PORT = process.env.PORT || argv.port || 9999

const resolvePath = ( userPath ) => cwd + '/' + userPath || ''

let common = {
	cache: true,
	context: path.resolve(__dirname),
	devtool: 'cheap-module-eval-source-map',
	entry: {
		isolate: [
			'webpack-hot-middleware/client',
			// 'webpack/hot/only-dev-server',
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
			'keo': path.resolve(__dirname, 'isolate-vendor', 'keo.js'),
			COMPONENTS_PATH: resolvePath(config.componentsPath),
		},
		extensions: [ '', '.js', '.jsx' ]
	},
	resolveLoader: {
		modulesDirectories: [
			path.resolve(__dirname, 'node_modules'),
			path.resolve(process.cwd(), 'node_modules'),
			'node_modules',
		]
	},
	module: {
		// noParse: [],
		// TODO: Add less, svg, img loaders
		loaders: [
			{
				test: /\.json$/, loader: 'json5'
			},
			{
				test: /\.md$/,
				loader: 'raw!markdown',
				happy: { id: 'md' }
			},
			{
				test: /\.js$/,
				loaders: [ 'babel' ],
				include: [
					path.resolve(__dirname, 'isolate-src'),
					resolvePath(config.componentsPath)
				],
				happy: { id: 'js' }
			},
			{
				test: /\.less$/,
				include: [
					path.resolve(__dirname, 'isolate-src'),
				],
				loaders: [
					'style?sourceMap',
					'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less?sourceMap'
				]
			},
		]
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
	},
	plugins: [
		new HappyPack({ id: 'js' }),
		new HappyPack({ id: 'md' }),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.IgnorePlugin(/\/_.+\//),
		new webpack.DefinePlugin({
			__ISOLATE__: JSON.stringify(omit(config, [ 'webpackConfig' ])),
			'process.env': {
				'NODE_ENV': JSON.stringify(NODE_ENV)
			}
		}),
		new webpack.PrefetchPlugin(path.resolve(__dirname, 'isolate-src'), './componentMap'),
		new webpack.PrefetchPlugin('keo'),
		// new webpack.PrefetchPlugin('react-ace'),
		new webpack.PrefetchPlugin('deep-equal'),
		new webpack.PrefetchPlugin('history'),
		new webpack.PrefetchPlugin('ramda'),
		new webpack.PrefetchPlugin('lodash'),
		new webpack.PrefetchPlugin('react-proxy'),
		new webpack.PrefetchPlugin('es6-weak-map'),
	],
}

if ( 'webpackConfig' in config ) {
	const webpackConfig = config.webpackConfig
	common = merge(common, webpackConfig)
	if ( 'smart' in webpackConfig ) {
		common = merge.smart(common.module.loaders, webpackConfig.smart)
	}
}

module.exports = common
module.exports.PORT = PORT
