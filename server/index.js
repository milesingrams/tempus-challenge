// Set options as a parameter, environment variable, or rc file.
require = require('esm')(module/*, options*/)

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

module.exports = require('./src/app.js')
