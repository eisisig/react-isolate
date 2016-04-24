const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const path = require("path")
const style = require('ansi-styles')
const pkg = require("../package.json")

// const isolateConfig = require('../isolate.config')
const webpackConfig = require('../webpack.config')

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

const compiler = webpack(webpackConfig)

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
})

server.listen(9999, () => banner())
