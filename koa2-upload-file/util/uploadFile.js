import fs from 'fs';
import os from 'os';
import path from 'path';

export default async (ctx) => {
  return new Promise((resolve, reject) => {
    const tmpdir = path.resolve(__dirname, '../upload');
    const filePaths = [];
    const files = ctx.request.body.files || {};

    for (let key in files) {
      const file = files[key];
      const filePath = path.join(tmpdir, file.name);
      const reader = fs.createReadStream(file.path);

      reader.pipe(fs.createWriteStream(filePath));

      reader.on('end', (res) => {
        filePaths.push(filePath);
        resolve(filePaths);
      });
      reader.on('error', (res) => {
        reject(res);
      });
    }
  });
}
