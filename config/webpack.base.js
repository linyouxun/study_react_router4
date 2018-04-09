const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const rootDir = path.join(__dirname, '../');
const theme = require('../src/common/theme');
const PUBLIC_FOLDER = 'dist';
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const styleExtractor = new ExtractTextPlugin('css/style.css', { allChunks: true });
const libExtractor = new ExtractTextPlugin('css/lib.css', { allChunks: true });
const isDev = process.env.NODE_ENV === 'development';
const baseConfig = {
  context: path.join(rootDir, 'src'),
  output: {
    path: path.join(rootDir, PUBLIC_FOLDER), // 必须是绝对地址
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', 'css', 'less', 'scss', 'png', 'jpg'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.join(rootDir, 'src'),
        options: {},
      }, {
        test: /jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-0'],
            plugins: [
              ['transform-runtime'],
              ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
            ],
          },
        }],
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
          //   loader: 'style-loader'
          // }, {
            loader: 'css-loader',
            options: {
              minimize: !isDev, // css压缩
            },
          }, {
            loader: 'postcss-loader',
          }],
        }),
      }, {
        test: /\.less$/,
        // use : [
        //   {loader : 'style-loader'},
        //   {loader: 'css-loader',options: {importLoaders: 1}},
        //   {loader: 'postcss-loader'},
        //   {loader : 'less-loader',options: {javascriptEnabled: true,modifyVars: theme()}}
        // ]
        use: libExtractor.extract({
          fallback: 'style-loader',
          use: [
            // { loader: 'style-loader'},
            { loader: 'css-loader', options: { importLoaders: 1, minimize: !isDev } },
            { loader: 'postcss-loader' },
            { loader: 'less-loader', options: { javascriptEnabled: true, modifyVars: theme() } },
          ],
        }),
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
          //   loader: 'style-loader'
          // }, {
            loader: 'css-loader',
            options: {
              minimize: !isDev, // css压缩
            },
          }, {
            loader: 'postcss-loader',
          }, {
            loader: 'sass-loader',
          }],
        }),
      }, {
        test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
        use: 'file-loader?limit=1&name=img/[sha512:hash:base64:7].[ext]',
      },
    ],
  },
  // externals: {
  //   jquery: 'jQuery'
  // },
  plugins: [
    styleExtractor,
    libExtractor,
  ],
};


let extra = {};
switch (process.env.NODE_ENV) {
  case 'development': {
    // 配置开发设置
    extra = {
      entry: {
        app: ['./index'],
        lib: ['react', 'react-dom', 'react-router', 'react-router-dom']
      },
      devtool: 'source-map',
      plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new HtmlWebpackPlugin({
        //   filename: 'static/index.html',
        //   template: path.join(rootDir, './src/index.html')
        // })
      ],
      // optimization: {
      //   runtimeChunk: true,
      //   splitChunks: {
      //     chunks: 'all'
      //   }
      // }
    };
    break;
  }
  case 'production': {
    // 生产设置
    extra = {
      entry: {
        app: ['./index'],
      },
      plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new Clean([PUBLIC_FOLDER], rootDir),
      ],
      optimization: {
        runtimeChunk: true,
        splitChunks: {
          chunks: 'all',
          minSize: 30000, // （默认值：30000）块的最小大小。
          minChunks: 1, // （默认值：1）分割前共享模块的最小块数
          maxInitialRequests: 3, // （默认值3）入口点上的最大并行请求数
          maxAsyncRequests: 3, // （缺省值5）按需加载时的最大并行请求数
          cacheGroups: {
            commons: {
              test: /react/,
              name: 'lib',
              chunks: 'all',
            },
            // commons2: {
            //   test: /\.css$|\.less$|\.scss$/,
            //   name: 'style',
            //   chunks: 'all',
            // }
          },
        },
      },
    };
    break;
  }
  default: {
    break;
  }
}

module.exports = merge(baseConfig, extra);
