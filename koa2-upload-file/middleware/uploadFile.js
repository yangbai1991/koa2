import fs from 'fs';
import os from 'os';
import path from 'path';

export default async (ctx, next) => {
  const tmpdir = path.resolve(__dirname, '../upload');
  const filePaths = [];
  const files = ctx.request.body.files || {};

  for (let key in files) {
    const file = files[key];
    const filePath = path.join(tmpdir, file.name);
    console.log(filePath);
    const reader = fs.createReadStream(file.path);
    reader.pipe(fs.createWriteStream(filePath));
    reader.on('end', (res) => {
      console.log(res);
    });
    reader.on('error', (res) => {
      console.log(res);
    });
    filePaths.push(filePath);
    ctx.body = filePaths;

    await next();
  }
}
