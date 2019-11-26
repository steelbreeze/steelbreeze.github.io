const path = require('path');

module.exports = {
  entry: './layout.js',
  mode: 'production',
  output: {
    filename: 'layout.min.js',
    library: 'layout',
    libraryTarget: 'var'
  }
};