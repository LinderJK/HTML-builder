const fs = require('fs');
const path = require('path');

const fineName = 'text.txt';
const absolutePath = path.resolve(__dirname, fineName);
const stream = fs.createReadStream(absolutePath);
let result = '';

stream.on('data', (chunk) => {
  result += chunk;
});

stream.on('end', () => {
  console.log(result);
});
stream.on('error', (error) => {
  console.error('Произошла ошибка при чтении файла:', error);
});
