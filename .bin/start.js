#!/usr/bin/env node

var _ = require('lodash');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var pkg = require('../package.json');
var app = express();

var isolateConfig = require('../config')(require('yargs').argv);
var webpackConfig = require('../webpack.config')(isolateConfig);

var compiler = webpack(webpackConfig);

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

app.get('/*', function ( req, res ) {
	res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(isolateConfig.port, isolateConfig.host, function ( err ) {
	if ( err ) { return console.log(err); }
	console.log(`
	                                         _
  ,_   _  __,   __  -/-     .  ,    _,_ // __,  -/- _
_/ (__(/_(_/(__(_,__/_    _/__/_)__(_/_(/_(_/(__/__(/_     v${pkg.version} ...starting
	`);
	console.log('Listening:         ', 'http://' + isolateConfig.host + ':' + isolateConfig.port);
	console.log('Components path:   ', path.resolve(isolateConfig.componentsPath));
	console.log('Fixtures path:     ', path.resolve(isolateConfig.fixturesPath));
	console.log('');
});
