#!/usr/bin/env node

var _ = require('lodash');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var argv = require('yargs').argv;
var pkg = require('../package.json');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var app = express();

var isolateConfig = require('../config')(require('yargs').argv);
var webpackConfig = require('../webpack.config')(isolateConfig);

var banner = function () {
	console.log(`
		                                         _
	  ,_   _  __,   __  -/-     .  ,    _,_ // __,  -/- _
	_/ (__(/_(_/(__(_,__/_    _/__/_)__(_/_(/_(_/(__/__(/_     v${pkg.version} ...starting
		`);
};

var compiler = webpack(webpackConfig);

if ( argv.build ) {
	compiler.apply(new ProgressPlugin(function ( percentage, msg ) {
		var perc = Math.round(percentage * 100);
		perc % 10 == 0 ? console.log(perc + '% -', msg) : null;
	}));

	console.log('Starting build...');
	compiler.run(function ( err, stats ) {
		if ( err ) {
			return console.log('react-isolate error', err);
		}
		console.log('Build successful!');

		console.log('===================================');
		console.log(stats.toJson({
			context: false,
			hash: false,
			version: false,
			timings: false,
			assets: false,
			chunks: false,
			chunkModules: false,
			modules: false,
			children: false,
			cached: false,
			reasons: false,
			source: false,
			errorDetails: false,
			chunkOrigins: false,
			modulesSort: false,
			chunksSort: false,
			assetsSort: false
		}));
		//console.log(prettyjson.render(stats, { noColor: true }));
		console.log('===================================');
	});
} else {

	var indexPath = path.resolve(process.cwd(), 'bundles', 'index.html');

	console.log('indexPath', indexPath);

	if ( !argv.static ) {

		indexPath = path.join(__dirname, '..', 'index.html');

		app.use(require('webpack-dev-middleware')(compiler, {
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
		}));

		app.use(require('webpack-hot-middleware')(compiler));
	}

	app.use(express.static('app'));
	app.use(express.static('bundles'));

	app.get('/*', function ( req, res ) {
		res.sendFile(indexPath);
	});

	var PORT = process.env.PORT || isolateConfig.port || 9999;
	var HOST = process.env.HOST || '0.0.0.0';

	app.listen(PORT, function ( err ) {
		if ( err ) { return console.log(err); }
		banner();
		console.log('Listening:         ', 'http://' + HOST + ':' + PORT);
		console.log('Components path:   ', path.resolve(isolateConfig.componentsPath));
		console.log('Fixtures path:     ', path.resolve(isolateConfig.fixturesPath));
		console.log('');
	});
}
