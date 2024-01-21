const fs = require('fs/promises');
const path = require('path');

async function filesInFolder() {
  const pathName = 'secret-folder';
  const absolutePath = path.resolve(__dirname, pathName);

  try {
    const files = await fs.readdir(absolutePath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(absolutePath, file.name);
        const fileExtension = path.extname(file.name);
        const fileStat = await fs.stat(filePath);
        const fileName = file.name.split('.').slice(0, -1).join('.');
        console.log(`${fileName} - ${fileExtension} - ${fileStat.size}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

filesInFolder();
