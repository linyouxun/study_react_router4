const path = require('path');
const webpack = require('webpack');
const rootDir = path.join(__dirname, '../');
const theme = require('../src/common/theme');
const PUBLIC_FOLDER = 'dist';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = {
  mode: 'development',
  entry: {
    app: ['webpack-dev-server/client?http://localhost:8080/', './src/index'],
    lib: ['react', 'react-dom', 'react-router', 'react-router-dom'],
  },
  output: {
    path: path.join(rootDir, PUBLIC_FOLDER),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    inline: true,
    hot: true,
    contentBase: path.join(rootDir, 'dist'),
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/' },
      ],
    },
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(rootDir, './src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    }),
  ],
};

module.exports = baseConfig;
