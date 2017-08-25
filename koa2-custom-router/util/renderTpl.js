const fs = require('fs');

export default async (tpl) => {
  return await new Promise((resolve, reject) => {
    fs.readFile(tpl, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}