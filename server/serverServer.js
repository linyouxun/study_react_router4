import path from 'path';
// import fs from 'fs';
import Koa from 'koa';
import serve from 'koa-static';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import App2 from '../src/App';

const htmlDOM = (html) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="http://static.yoju360.com/favicon.ico">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/lib.css">
    <link rel="stylesheet" href="/css/style.css">
    <title>热牧</title>
  </head>
  <body>
    <div id="root">${html}</div>
    <script type="text/javascript" src="/runtime~app.js"></script>
    <script type="text/javascript" src="/lib.js"></script>
    <script type="text/javascript" src="/vendors~app.js"></script>
    <script type="text/javascript" src="/app.js"></script>
  </body>
  </html>`;
};

const app = new Koa();

// 静态文件
app.use(serve(path.join(__dirname, '../dist')));
app.use(serve(path.join(__dirname, '../static')));

app.use(async (ctx) => {
  const html = renderToString(<Router context={{}} location={ctx.url}><App2 /></Router>);
  const h = htmlDOM(html);
  ctx.body = h;
});

app.listen(3000);
