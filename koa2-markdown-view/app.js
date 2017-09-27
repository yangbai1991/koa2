import { resolve } from 'path';
import fs from 'fs';

import Koa from 'koa';
import views from 'koa-views';
import serve from 'koa-static';
import marked from 'marked';

const readme = resolve(__dirname, './docs/README.md');
let markdown = marked(fs.readFileSync(readme, 'utf8'));

fs.watchFile(readme, { persistent: true, interval: 1000 }, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    markdown = marked(fs.readFileSync(readme, 'utf8'));
  }
});

const app = new Koa();

app.use(serve(resolve(__dirname, './static')));

app.use(views(
  resolve(__dirname, './view'),
  { extension: 'ejs' }
));

app.use(async ctx => {
  await ctx.render('index', { markdown });
});

app.listen(3000);

console.log('server is listening on port 3000...');