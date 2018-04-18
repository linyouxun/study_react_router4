const webpack = require('webpack');
const config = require('../config/webpack.dev.js');
const koaWebpack = require('koa-webpack-middleware');
const devMiddleware = koaWebpack.devMiddleware;
const hotMiddleware = koaWebpack.hotMiddleware;
const compiler = webpack(config);
const Koa = require('koa');
const app = new Koa();

const htmlDOM = () => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="http://static.yoju360.com/favicon.ico">
    <title>热牧</title>
  <link href="/css/app.css" rel="stylesheet"></head>
  <body>
    <div id="root"></div>
  <script type="text/javascript" src="/app.js"></script><script type="text/javascript" src="/lib.js"></script></body>
  </html>`;
};

app.use(devMiddleware(compiler, {}));
app.use(hotMiddleware(compiler, {}));

app.use(async (ctx) => {
  // ctx.response.type = 'html';
  ctx.response.type = 'html';
  const h = htmlDOM();
  ctx.body = h;
});

app.listen(3000, () => {
  console.log('http://localhost:3000/');
});
