import Koa from 'koa';
import koaBody from 'koa-body';

import uploadFile from './middleware/uploadFile';

const app = new Koa();

app.use(koaBody({ multipart: true }));
app.use(uploadFile);

app.use(async (ctx) => {
  ctx.body = 'app start';
});

app.listen(3000);

console.log('server is listening on port 3000...');