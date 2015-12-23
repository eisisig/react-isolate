'use strict';

const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');
const argv = require('yargs').argv;
const cwd = process.cwd();

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isolateDefaultConfig = require(path.resolve(__dirname, 'isolate.config.js'));

let isolateCustomConfig = {};

try {
	isolateCustomConfig = require(path.resolve(process.cwd(), 'isolate.config.js'));
} catch ( e ) {
	console.log('No custom isolate.config.js found');
}

const isolateConfig = _.merge({}, isolateDefaultConfig, isolateCustomConfig);

const resolvePath = function ( userPath ) {
	return cwd + '/' + userPath;
};

module.exports = function ( customConfig ) {
	const defaultConfig = {
		context: __dirname,
		debug: true,
		cache: true,
		devtool: 'eval',
		entry: [
			'./_lib/entry.js',
			'./_styles/global.less',
			'babel-polyfill',
			'webpack-hot-middleware/client'
		],
		output: {
			path: path.resolve(__dirname, 'bundles'),
			filename: 'bundle.js',
			publicPath: '/'
		},
		resolve: {
			modulesDirectories: [
				path.resolve(__dirname, 'node_modules'),
				path.resolve(__dirname, '..', 'node_modules'),
				path.resolve(process.cwd(), 'node_modules')
			],
			alias: {
				LIB_PATH: path.resolve(__dirname, '_lib'),
				TESTS_PATH: resolvePath(argv.testsPath || isolateConfig.testsPath),
				FIXTURES_PATH: resolvePath(argv.fixturesPath || isolateConfig.fixturesPath),
				COMPONENTS_PATH: resolvePath(argv.componentsPath || isolateConfig.componentsPath),
				RAW_COMPONENTS_PATH: resolvePath(argv.componentsPath || isolateConfig.componentsPath),
				RAW: resolvePath(argv.componentsPath || isolateConfig.componentsPath)
			},
			extensions: ['', '.js', '.jsx']
		},
		resolveLoader: {
			modulesDirectories: [
				path.resolve(__dirname, 'node_modules'),
				path.resolve(__dirname, '..', 'node_modules'),
				path.resolve(process.cwd(), 'node_modules')
			]
		},
		node: {
			fs: 'empty'
		},
		module: {
			noParse: [
				/autoit.js/,
				/marked/
			],
			loaders: [
				{ test: /\.md$/, loader: 'raw!markdown' },
				{
					test: /\.js$/,
					exclude: [
						/node_modules\/(?!react-isolate)/
					],
					loader: 'babel',
					query: {
						presets: ['es2015', 'stage-0', 'react'],
						env: {
							development: {
								plugins: [
									['transform-runtime'],
									['react-transform', {
										transforms: [
											{
												transform: 'react-transform-hmr',
												imports: ['react'],
												locals: ['module']
											},
											{
												transform: 'react-transform-catch-errors',
												imports: ['react', 'redbox-react']
											}
										]
									}]
								]
							}
						}
					}
				},
				{
					test: /\.json$/,
					loaders: ['json5']
					//exclude: [
					//	/node_modules\/(?!react-isolate)/
					//]
				},
				{
					test: /\.gif$/,
					loaders: ['file'],
					exclude: /node_modules/
				},
				{
					test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'file-loader?name=fonts/[name].[ext]',
					exclude: /images/
				},
				{
					test: /\.(woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'file-loader?name=fonts/[name].[ext]',
					exclude: /css/
				},
				{
					test: /\.less$/,
					loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less'),
					include: /_styles/
				},
				{
					test: /\.css$/,
					loader: 'style!css',
					exclude: /_styles/
				},
				{
					test: /\.less$/,
					loader: 'style!css!less',
					exclude: /_styles/
				}
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new ExtractTextPlugin('styles.css')
		]
	};

	const webpackConfig = _.merge(defaultConfig, customConfig.webpackConfig, ( a, b ) => {
		if ( _.isArray(a) ) return a.concat(b);
	});

	//console.log('webpackConfig', webpackConfig);

	return webpackConfig;

};
