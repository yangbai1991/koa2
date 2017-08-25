const path = require('path');
const fs = require('fs');

import Koa from 'koa';
import serve from 'koa-static';

async function readdir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

const app = new Koa();

const staticPath = path.resolve(__dirname, 'static');

app.use(serve(staticPath));

app.use(async (ctx,next) => {
  const path = ctx.path.replace('/', '');
  try {
    const data = await readdir(staticPath + '/' + path);
    let html = '<ul>';
    data.map(function(value) {
      // const stats = fs.statSync(staticPath + '/' + path + '/' + value);
      // let delimiter = '/';
      // if (stats.isDirectory()) {
      //   delimiter = '';
      // }
      html += `<li><a href="${path}/${value}">${value}</a></li>`
    });
    html += '</ul>';
    ctx.body = html;
  } catch (e) {
    console.dir(e.message);
    await next();
  }
});

app.use(async (ctx) => {
  ctx.body = '<h1>404</h1>';
});

app.listen(3000);

console.log('server is listening on port 3000...');