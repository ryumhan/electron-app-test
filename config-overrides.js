const path = require('path');

module.exports = function override(config){
  // Add your alias configuration here
   config.target = 'electron-renderer';
   config.resolve.alias = {
    '@': path.resolve(__dirname, 'src'),
  };
  
  return config
}
