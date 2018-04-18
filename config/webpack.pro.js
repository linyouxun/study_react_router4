const path = require('path');
const webpack = require('webpack');
const rootDir = path.join(__dirname, '../');
const theme = require('../src/common/theme');
const PUBLIC_FOLDER = 'dist';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const baseConfig = {
  context: path.join(rootDir, 'src'),
  entry: {
    app: ['./index'],
  },
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
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
        ],
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
          { loader: 'less-loader', options: { javascriptEnabled: true, modifyVars: theme() } },
        ],
      }, {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      }, {
        test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
        use: 'file-loader?limit=1&name=img/[sha512:hash:base64:7].[ext]',
      },
    ],
  },
  optimization: {
    runtimeChunk: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
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
        styles: {
          test: /\.css$|\.less$|\.scss$/,
          name: 'style',
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new Clean([PUBLIC_FOLDER], rootDir),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    }),
  ],
};
module.exports = baseConfig;
