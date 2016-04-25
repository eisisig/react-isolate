#!/usr/bin/env node
'use strict';

const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const path = require("path")
const style = require('ansi-styles')
const pkg = require("../package.json")

const config = require('../config')
const webpackConfig = require('../webpack.config')

console.log('--------')
console.log(JSON.stringify(config, null, 4))
console.log('--------')
console.log(JSON.stringify(webpackConfig, null, 4))
console.log('--------')

var banner = function () {
	console.log(`${style.blue.open}
                    |       o          |         |         
,---.,---.,---.,---.|---    .,---.,---.|    ,---.|--- ,---.
|    |---',---||    |    ---|\`---.|   ||    ,---||    |---'
\`    \`---'\`---^\`---'\`---'   \`\`---'\`---'\`---'\`---^\`---'\`---'

v${pkg.version} ...starting
${style.blue.close}
`)
}

new WebpackDevServer(webpack(webpackConfig), {
	contentBase: path.resolve(__dirname, '..', 'isolate-src'),
	publicPath: webpackConfig.output.publicPath,
	hot: true,
	historyApiFallback: true,
	stats: {
		colors: true,
		timings: true,
		chunks: true,
		assets: false,
		version: false,
		hash: false,
		chunkModules: false,
	}
})
	.listen(webpackConfig.PORT, 'localhost', function (error) {
		if ( error ) console.log(error)
		banner()
		console.log('Listening at localhost:' + webpackConfig.PORT)
	})
