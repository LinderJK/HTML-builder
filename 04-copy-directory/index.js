const fs = require('fs/promises');
const path = require('path');

const dirName = 'files';
const dir = path.resolve(__dirname, dirName);

async function copyDir() {
  const newDirPath = path.join(__dirname, 'files-copy');

  try {
    const existingFiles = await fs.readdir(newDirPath);
    for (const file of existingFiles) {
      const filePath = path.join(newDirPath, file);
      await fs.unlink(filePath);
    }
  } catch (error) {
    // Ошибка не выводится просто продолжаем работу
  }

  await fs.mkdir(newDirPath, { recursive: true });
  const files = await fs.readdir(dir);

  for (const file of files) {
    const sourceFilePath = path.join(dir, file);
    const destinationFilePath = path.join(newDirPath, file);
    await fs.copyFile(sourceFilePath, destinationFilePath);
    console.log(`Файл скопирован: ${file}`);
  }
}

copyDir();
