'use strict'

const merge = require('lodash.merge')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))

let config = {}

merge(config, require(path.resolve(__dirname, 'isolate.config.js')))

try {
	merge(config, require(path.resolve(process.cwd(), 'isolate.config.js')))
} catch ( e ) {}

module.exports = merge(config, argv)
