const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require("path");
const pkg = require("../package.json");

// const isolateConfig = require('../isolate.config');
const webpackConfig = require('../webpack.config');

webpackConfig.entry.unshift(
	'webpack-dev-server/client',
	'webpack/hot/dev-server'
);

webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());

var banner = function () {
	console.log(`
		                                         _
	  ,_   _  __,   __  -/-     .  ,    _,_ // __,  -/- _
	_/ (__(/_(_/(__(_,__/_    _/__/_)__(_/_(/_(_/(__/__(/_     v${pkg.version} ...starting
`);
};

const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, {
	contentBase: path.resolve(__dirname, '..', 'isolate-src'),
	hot: true,
	inline: true,
	historyApiFallback: true,
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

server.listen(9999, () => banner());
