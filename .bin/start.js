#!/usr/bin/env node

var _ = require('lodash');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var argv = require('yargs').argv;
var pkg = require('../package.json');
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
	console.log('Starting build...');
	compiler.run(function ( err, stats ) {
		if ( err ) {
			console.log('react-isolate error', err);
		}
		console.log('Build successful!');
	});
} else {

	var indexPath = path.join(process.cwd(), 'bundles', 'index.html');

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

	app.use(express.static('bundles'));

	app.get('/*', function ( req, res ) {
		res.sendFile(indexPath);
	});

	app.listen(process.env.PORT || isolateConfig.port, isolateConfig.host, function ( err ) {
		if ( err ) { return console.log(err); }
		banner();
		console.log('Listening:         ', 'http://' + isolateConfig.host + ':' + isolateConfig.port);
		console.log('Components path:   ', path.resolve(isolateConfig.componentsPath));
		console.log('Fixtures path:     ', path.resolve(isolateConfig.fixturesPath));
		console.log('');
	});
}
