import Koa from 'koa';

import router from './middleware/router';

const app = new Koa();

app.use(router);

// app.use(async (ctx, next) => {
//   ctx.body = 'Hello Koa2';
//   console.log(`********** ${ctx}`);
//   console.log(`********** ${next}`);
// });

app.listen(3000);
console.log('server listening on port 3000....');