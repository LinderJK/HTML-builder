const fs = require('fs');
const path = require('path');
const readline = require('readline');

const fineName = 'text.txt';
const absolutePath = path.resolve(__dirname, fineName);

const writeStream = fs.createWriteStream(absolutePath, { flags: 'a' });
if (writeStream) {
  console.log('Привет введите текст для сохранения! Команда для выхода exit');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  if (input.includes('exit')) {
    rl.close();
    writeStream.end();
  } else {
    writeStream.write(`${input}`);
  }
});
rl.on('close', () => {
  console.log('Программа завершена. Данные сохранены в файл:', fineName);
});
