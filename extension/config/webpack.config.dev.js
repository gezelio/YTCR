'use strict';

const { merge } = require('webpack-merge');

const dev = require('./webpack.dev.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = merge(dev, {
    entry: {
        contentScript: PATHS.src + '/contentScript.js',
        background: PATHS.src + '/background.js',
        main: PATHS.src + '/main.js',
        youtube: PATHS.src + '/youtube.js',
        log: PATHS.src + '/log.js',
    }
});

module.exports = config;
