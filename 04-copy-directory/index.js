const fs = require('fs/promises');
const path = require('path');

const dirName = 'files';
const dir = path.resolve(__dirname, dirName);

async function copyDir() {
  const newDirPath = path.join(__dirname, 'files-copy');

  await fs.mkdir(newDirPath, { recursive: true });
  const files = await fs.readdir(dir);


}

copyDir();
