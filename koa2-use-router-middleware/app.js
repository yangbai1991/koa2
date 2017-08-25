import Koa from 'koa';

import router from './middleware/router';

const app = new Koa();

app
  .use(router.routes())
  .use(router.allowedMethods({
    throw: true,
    notImplemented: () => { console.log('Not Implemented') },
    methodNotAllowed: () => { console.log('Not Allowed') }
  }));

app.use(async (ctx, next) => {
  ctx.body = '<h1>404</h1>';
  // next => 继续往下执行。。。
  // await next();
});

app.use(async (ctx) => {
  ctx.body = '<h1>4041</h1>';
});

app.listen(3000);

console.log('server is lsitening on port 3000...');