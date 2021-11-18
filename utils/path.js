/**
 * This module returns the absolute root path of the express application.
 * - require in arguments point to package.json of the app.
 * - require.main looks for 'main' attribute in package.json. If package.json or 'main' is not
 * present then require.main returns the default value of 'index.js'
 * - require.main.filename returns the name of entrypoint file of appliation or the value of
 * 'main' attribute in package.json.
 * - .dirname() method returns the name of parent directory in which require.main.filename is
 * present.
 * - path.dirname() returns the absolute path of directory in which require.main.file is present.
 */
const path = require('path');

module.exports = path.dirname(require.main.filename);
