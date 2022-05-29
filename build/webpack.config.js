// 引入内置模块path, 用于获取文件路径
const path = require('path')

/* 插件plugin */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

// 导出配置信息
module.exports = {
  // 配置开发服务器
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')//告诉服务器内容来源
    },
    port: 8080,
    hot: true, //开启热更新
  },
  /* 设置模式，默认为生产模式 production;也可以是none*/
  mode: 'development',
  /* 
    入口文件 【单个入口是属性，配置多个入口是需要配置成对象】
    path.reslove() 由相对路劲计算出绝对路径; __dirname指的是当前模块的目录名称
  */
  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  }, 
  /* 出口信息 */
  output: {
    // 输出文件名 确保每次生成的文件名不重复，防止文件更新后浏览器仍使用缓存文件
    filename: '[name].[hash:8].js',
    // 输出文件路径
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    // 该插件会自动引入生成的js文件
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        '../public/index.html'
      ), // 设置html模板
      filename: 'index.html',
      chunks: ['main'], //用于关联entry的文件
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].css',
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
   
  ],
  module: {
    // 配置模块规则
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(jp?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  // 超出限制之后使用file-loader;ext是文件本来的扩展名
                  name: 'image/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ],
            },
          },
        ],
        // 排除依赖下的js
        exclude: /node_modules/,
      },
    ],
  },
  // 配置模块的解析规则
  resolve: {
    // 创建别名
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      // 设置@引用的地址为根目录下的src
      '@': path.resolve(__dirname, '../src')
    },
    //按顺序解析以下数组后缀名的文件
    extensions: ['*', '.js', '.json', '.vue']
  }
}
