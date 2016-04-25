#!/usr/bin/env node

const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const path = require("path")
const style = require('ansi-styles')
const pkg = require("../package.json")

const isolateConfig = require('../isolate.config')
const webpackConfig = require('../webpack.config')

var banner = function () {
	console.log(`${style.blue.open}
                    |       o          |         |         
,---.,---.,---.,---.|---    .,---.,---.|    ,---.|--- ,---.
|    |---',---||    |    ---|\`---.|   ||    ,---||    |---'
\`    \`---'\`---^\`---'\`---'   \`\`---'\`---'\`---'\`---^\`---'\`---'

v${pkg.version} ...starting
${style.blue.close}
---
${JSON.stringify(isolateConfig, null, 4)}
---
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
