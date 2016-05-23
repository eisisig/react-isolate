#!/usr/bin/env node
'use strict'

const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const path = require("path")
const express = require("express")
const style = require('ansi-styles')
const pkg = require("../package.json")

const config = require('../config')
const webpackConfig = require('../webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

const banner = function () {
	console.log(`${style.blue.open}
                    |       o          |         |         
,---.,---.,---.,---.|---    .,---.,---.|    ,---.|--- ,---.
|    |---',---||    |    ---|\`---.|   ||    ,---||    |---'
\`    \`---'\`---^\`---'\`---'   \`\`---'\`---'\`---'\`---^\`---'\`---'

v${pkg.version} ...starting
${style.blue.close}
`)
}

app.use(require('webpack-dev-middleware')(compiler, {
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
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function ( req, res ) {
	res.sendFile(path.resolve(__dirname, '..', 'isolate-src', 'index.html'))
})

app.listen(webpackConfig.PORT, function ( err ) {
	if ( err ) { return console.error(err) }
	banner()
	console.log('Listening at http://localhost:' + webpackConfig.PORT)
})
