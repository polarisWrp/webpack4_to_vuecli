// 生产环境配置 实现css,js代码压缩

const Path = require('path')
const WebpackConfig = require('./webpack.config')
const WebpackMerge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = WebpackMerge(
  WebpackConfig,
  {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
      new CopyWebpackPlugin([
        {
          from: Path.resolve(
            __dirname,
            '../public'
          ),
          to: Path.resolve(
            __dirname,
            '../dist'
          ),
        },
      ]),
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCssAssetsWebpackPlugin(
          {}
        ),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', //只打包初始时依赖的第三方库
          },
        },
      },
    },
  }
)