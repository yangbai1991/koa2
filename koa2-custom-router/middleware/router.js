import renderTpl from '../util/renderTpl';

export default async (ctx) => {
  const path = ctx.request.path;
  let tpl = './view/404.html';
  switch (path) {
    case '/':
      tpl = './view/index.html';
      break;
    case '/list':
      tpl = './view/list.html';
      break;
    case '/add':
      tpl = './view/add.html';
      break;
    case '/edit':
      tpl = './view/edit.html';
      break;
    case '/delete':
      tpl = './view/delete.html';
      break;
    default:
      tpl = './view/404.html';
      break;
  }
  // const html = fs.readFileSync(tpl);
  // console.log(html.toString());
  // ctx.body = html.toString();
  ctx.body = await renderTpl(tpl)
};