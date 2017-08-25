import Router from 'koa-router';

const router = new Router();

router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .get('/add/:name', (ctx, next) => {
    ctx.body = `Add: ${ctx.params.name}`;
  });

  export default router;