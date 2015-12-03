#!/usr/bin/env node

var _ = require('lodash');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var argv = require('yargs').argv;

var isolateDefaultConfig = require(path.resolve(__dirname, '..', 'isolate.config.js'));

var isolateCustomConfig = {};

try {
	isolateCustomConfig = require(path.resolve(process.cwd(), 'isolate.config.js'));
} catch ( e ) {
	//console.log('No custom isolate.config.js found');
}

var isolateConfig = _.merge({}, isolateDefaultConfig, isolateCustomConfig, argv);

var config = require('../webpack.config')(isolateConfig);

var port = argv.port || isolateConfig.port;
var host = argv.host || isolateConfig.host;

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath,
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

app.listen(port, host, function ( err ) {
	if ( err ) { return console.log(err); }
	console.log('Listening at http://' + host + ':' + port);
});
