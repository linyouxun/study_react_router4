import path from 'path';
import fs from 'fs';
import Koa from 'koa';
import serve from 'koa-static';

const app = new Koa();

// 静态文件
app.use(serve(path.join(__dirname, '../dist')));

app.use(async ctx => {
  ctx.body = htmlDOM();
});

let htmlDOM = () => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Dome</title>
      
    </head>
    <body>
      <div id="root"></div>
    <script type="text/javascript" src="/lib.js"></script><script type="text/javascript" src="/app.js"></script></body>
    </html>`
}

app.listen(3000);
