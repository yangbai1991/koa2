import fs from 'fs';
import os from 'os';
import path from 'path';

export default async (ctx) => {
  return new Promise((resolve, reject) => {
    const tmpdir = path.resolve(__dirname, '../upload');
    const filePaths = [];
    /**
     * address a potential security issue, the files property has been moved to ctx.request.files.
     * In prior versions, files was a property of ctx.request.body.
     */
    const files = ctx.request.body.files || ctx.request.files || {};

    for (let key in files) {
      const file = files[key];
      const filePath = path.join(tmpdir, file.name);
      const reader = fs.createReadStream(file.path);

      reader.pipe(fs.createWriteStream(filePath));
      // reader
      //   .pipe(fs.createWriteStream(filePath))
      //   .on('finish', () => {
      //     filePaths.push(filePath);
      //     resolve(filePaths);
      //   });
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
