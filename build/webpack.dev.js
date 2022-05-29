// 开发环境配置  主要实现热更新，不用压缩代码，完整的sourceMap
const Path = require('path')
const Webpack = require('webpack')
const WebpackConfig = require('./webpack.config')
const WebpackMerge = require('webpack-merge')

module.exports = WebpackMerge(WebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 3000,
    hot: true,
    static: {
      directory: Path.join(__dirname, 'dist')
    }
  },
  plugins: [
    new Webpack.HashedModuleIdsPlugin()
  ]
})