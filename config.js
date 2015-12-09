'use strict';

var _ = require('lodash');
var path = require('path');
var config = {};

module.exports = function ( argv ) {
	_.merge(config, require(path.resolve(__dirname, 'isolate.config.js')));
	try {
		_.merge(config, require(path.resolve(process.cwd(), 'isolate.config.js')));
	} catch ( e ) {}
	return _.merge(config, argv);
};
