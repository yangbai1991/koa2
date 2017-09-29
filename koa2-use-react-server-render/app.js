import Koa from 'koa';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import AppComponent from './client/App';

const app = new Koa();

app.use(async ctx => {
  ctx.body = ReactDOMServer.renderToString(<AppComponent />);
});

app.listen(3000);

console.log('server is listening on port 3000...');