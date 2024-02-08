const path = require('path');

module.exports = {
  // Other webpack configurations...
  resolve: {
    fallback: {
      fs: false, // or require.resolve('fs') if you need it
      os: false, // or require.resolve('os-browserify/browser') if you need it
      path: false // or require.resolve('path-browserify') if you need it
    }
  }
};
