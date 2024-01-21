const fs = require('fs');
const path = require('path');


const fineName = 'text.txt';
const absolutePath = path.resolve(__dirname, fineName);

const writeStream = fs.createWriteStream(absolutePath, { flags: 'a' });
if (writeStream) {
  console.log('Привет введите текст для сохранения! Команда для выхода exit');
}

