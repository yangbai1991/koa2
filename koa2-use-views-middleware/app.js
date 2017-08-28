import { resolve } from 'path';
import Koa from 'koa';
import views from 'koa-views';

const app = new Koa();

app.use(views(resolve(__dirname, './views'), {
  extension: 'ejs'
}));

app.use(async (ctx) => {
  const title = 'Index Page';
  await ctx.render('index', { title });
});

app.listen(3000);

console.log('server is listening on port 3000...');