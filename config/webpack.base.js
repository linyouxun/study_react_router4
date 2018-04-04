const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge');
const rootDir = path.join(__dirname, '../');
const theme = require('../src/common/theme');
const PUBLIC_FOLDER = 'dist';
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const baseConfig = {
  context: path.join(rootDir, "src"),
  output: {
    path: path.join(rootDir, PUBLIC_FOLDER), //必须是绝对地址
    filename: '[name].js',
    publicPath: "/"
  },
  resolve:{
    extensions:[".js",".jsx","css","less","scss","png","jpg"]
  },
  module: {
    rules:[
      {
        test:/jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: { 
            presets: ["react","es2015", "stage-0"] ,
            plugins : [
              ['transform-runtime'],
              ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
            ],
          }
        }]
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          // fallback: "style-loader",
          use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: 'postcss-loader'
          }]
        })
      }, {
        test: /\.less$/,
        use : [
          {loader : 'style-loader'},
          {loader: 'css-loader',options: {importLoaders: 1}},
          {loader: 'postcss-loader'},
          {loader : 'less-loader',options: {javascriptEnabled: true,modifyVars: theme()}}
        ]
        // use: ExtractTextPlugin.extract({
        //   use : [
        //     {loader : 'style-loader'},
        //     {loader: 'css-loader',options: {importLoaders: 1}},
        //     {loader: 'postcss-loader'},
        //     {loader : 'less-loader',options: {javascriptEnabled: true,modifyVars: theme()}}
        //   ]
          // use: [{
          //   loader: "style-loader?sourceMap"
          // }, {
          //   loader: "css-loader?sourceMap",
          //   options: {
          //     importLoaders: 1
          //   }
          // }, {
          //   loader: 'postcss-loader?sourceMap',
          //   // options: { 
          //   //   // parser: 'sugarss', 
          //   //   exec: true,
          //   //   plugins: () => [autoprefixer(
          //   //     { browsers: ['iOS >= 7', 'Android >= 4.1', 
          //   //        'last 10 Chrome versions', 'last 10 Firefox versions', 
          //   //        'Safari >= 6', 'ie > 8'] 
          //   //     }
          //   //   )]
          //   // } 
          // }, {
          //   loader: "less-loader?sourceMap",
          //   options: { 
          //     javascriptEnabled: true,
          //     modifyVars: theme()
          //   } 
          // }],
          // fallback: "style-loader"
        // })
      // }, {
      //   test: /\.scss$/,
      //     use: ExtractTextPlugin.extract({
      //       use: [{
      //         loader: "style-loader"
      //       }, {
      //         loader: "css-loader"
      //       }, {
      //         loader: 'postcss-loader'
      //       }, {
      //         loader: "sass-loader"
      //       }],
      //       // fallback: "style-loader"
      //   })
      }, {
        test  : /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
        use: `file-loader?limit=1&name=img/[sha512:hash:base64:7].[ext]`
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin("style.css")
  ]
}




let extra = {};
switch(process.env.NODE_ENV) {
  case 'development': {
    //配置开发设置
    extra = {
      entry: {
        app: ['./index'],
        lib: ["react", "react-dom", "react-router", "react-router-dom"]
      },
      devtool: 'source-map',
      plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new HtmlWebpackPlugin({
        //   filename: 'static/index.html',
        //   template: path.join(rootDir, './src/index.html')
        // })
      ],
      optimization: {
        splitChunks: {
          chunks: 'all'
        }
      }
    };
    break;
  }
  case 'production': {
    //生产设置
    extra = {
      entry: {
        app: ['./index'],
        lib: ["react", "react-dom", "react-router", "react-router-dom"]
      },
      plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
      ]
    };
    break;
  }
  default: {

  }
}

module.exports = merge(baseConfig, extra);