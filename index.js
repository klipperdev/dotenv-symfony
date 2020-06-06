/*
 * This file is part of the Klipper package.
 *
 * (c) François Pluchino <francois.pluchino@klipper.dev>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const dotenv = require('dotenv');
const fs = require('fs');

/**
 * @param {Object} config
 * @param {String} filename
 *
 *
 * @typedef {Boolean|undefined} config.debug
 * @typedef {String|undefined}  config.encoding
 * @typedef {String|undefined}  config.basePath
 * @typedef {String|undefined}  config.env
 */
function load(config, filename) {
    const filePath = (undefined !== config.basePath ? config.basePath + '/' : '') + filename;

    if (fs.existsSync(filePath)) {
        dotenv.config({
            debug: config.debug,
            encoding: config.encoding,
            path: filePath
        });
    }
}

/**
 * @param {Object} [config]
 *
 * @typedef {Boolean|undefined} config.debug
 * @typedef {String|undefined}  config.encoding
 * @typedef {String|undefined}  config.basePath
 * @typedef {String|undefined}  config.env
 */
function config(config) {
    let envName = 'production' === process.env.NODE_ENV ? 'prod' : 'dev';
    config = config || {};

    if (undefined !== config.env) {
        envName = config.env;
    }

    load(config, '.env.' + envName + '.local');
    load(config, '.env.' + envName);
    load(config, '.env.local');
    load(config, '.env');
}

module.exports = {
    config
};
