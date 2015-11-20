#!/usr/bin/env node

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var argv = require('yargs').argv;

var customConfig = {
	argv: argv
};

var config = require('../webpack.config')(customConfig);

var port = argv.port || 9999;
var host = argv.host || 'localhost';

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
