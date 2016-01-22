'use strict';

var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var argv = require('yargs').argv;
var cwd = process.cwd();
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isolateConfig = require('./config')(argv);

var resolvePath = function ( userPath ) {
	return cwd + '/' + userPath;
};

var babelQuery = {
	presets: ['es2015', 'stage-0', 'react'],
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
};

var jsLoader = 'babel?' + JSON.stringify(babelQuery);

if ( isolateConfig.autoImportLess ) {
	jsLoader = 'component-css?ext=' + isolateConfig.autoImportStyleExt + '!' + jsLoader;
}

module.exports = function ( customConfig ) {
	var defaultConfig = {
		context: __dirname,
		debug: true,
		cache: true,
		devtool: 'eval',
		entry: [
			'./_lib/entry.js',
			'./_styles/global.less',
			'webpack-hot-middleware/client'
		],
		output: {
			path: path.resolve(cwd, process.env.OUTPUT_PATH || isolateConfig.outputPath),
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
				TESTS_PATH: resolvePath(isolateConfig.testsPath),
				FIXTURES_PATH: resolvePath(isolateConfig.fixturesPath),
				COMPONENTS_PATH: resolvePath(isolateConfig.componentsPath),
				RAW_COMPONENTS_PATH: resolvePath(isolateConfig.componentsPath),
				RAW: resolvePath(isolateConfig.componentsPath)
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
						/node_modules/
					],
					loader: jsLoader,
					//query: babelQuery
				},
				{
					test: /\.json$/,
					loaders: ['json5']
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
					loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less',
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
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'index.html')
			})
		]
	};

	var webpackConfig = _.merge(defaultConfig, customConfig.webpackConfig, ( a, b ) => {
		if ( _.isArray(a) ) return a.concat(b);
	});

	if ( argv.build ) {
		console.log('webpackConfig.output', JSON.stringify(webpackConfig.output, null, 4));
	}

	return webpackConfig;

};
