let base = require('./webpack.local.js');
const merge = require('webpack-merge');
//配置开发设置
const developmentConfig = {
  entry: {
    app: ['babel-polyfill','./index']
  },
  plugins: []
};
module.exports = merge(baseConfig,developmentConfig);