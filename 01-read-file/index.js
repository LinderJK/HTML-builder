const fs = require('fs');
const path = require('path');

const basePath = '../HTML-builder/01-read-file';
const fineName = 'text.txt';
const absolutePath = path.resolve(basePath, fineName);

const stream = fs.createReadStream(absolutePath);
let result = '';
stream.on('data', (chunk) => {
  result += chunk;
});

stream.on('end', () => {
  console.log(result);
});
