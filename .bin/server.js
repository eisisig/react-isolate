const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require("path");

const webpackConfig = require('../webpack.config');

webpackConfig.entry.unshift(
	'webpack-dev-server/client?http://localhost:9999/',
	'webpack/hot/dev-server'
);

webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, {
	contentBase: path.resolve(__dirname, '..', 'isolate-src'),
	hot: true,
	historyApiFallback: true,
	inline: true,
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true,
		timings: true,
		chunks: true,
		assets: false,
		version: false,
		hash: false,
		chunkModules: false
	}
});

server.listen(9999, () => console.log('Server started'));
