import Koa from 'koa';
import koaBody from 'koa-body';

import uploadFile from './util/uploadFile';

const app = new Koa();

app.use(koaBody({ multipart: true }));
//app.use(uploadFile);

app.use(async (ctx) => {
  const res = await uploadFile(ctx);
  ctx.body = res;
});

app.listen(3000);

console.log('server is listening on port 3000...');