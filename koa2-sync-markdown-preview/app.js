import { createServer } from 'http';
import { resolve } from 'path';
import fs from 'fs';
import Koa from 'koa';
import views from 'koa-views';
import serve from 'koa-static';
import socketIO from 'socket.io';
import marked from 'marked';
import opn from 'opn';

const app = new Koa();

app.use(views(
  resolve(__dirname, 'view'),
  { extension: 'html' }
));

app.use(serve(resolve(__dirname, 'static')));

app.use(async ctx => {
  await ctx.render('index');
});

const server = createServer(app.callback());
const io = socketIO(server);

io.on('connection', function (client){
  const file = 'example.md';
  client.emit('markdown', marked(fs.readFileSync(file, 'utf8')));
  fs.watchFile(file, { persistent: true, interval: 1000 }, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      fs.readFile(file, 'utf8', (err, data) => {
        client.emit('markdown', marked(data));
      });
    }
  });
});

server.listen(3000);

console.log('socket server is listening on port 3000...');

opn('http://localhost:3000');