const fs = require('fs/promises');
const path = require('path');
const { error } = require('console');
const { stat } = require('fs');

const stylesDir = path.resolve(__dirname, 'styles');
const distDir = path.resolve(__dirname, 'project-dist');
const cssBundle = path.join(distDir, 'bundle.css');

async function cssMerge() {
  const files = await fs.readdir(stylesDir);
  console.log(files, 'files');

  const cssFiles = files.filter((file) => path.extname(file) === '.css');
  console.log(cssFiles, 'cssfiles');

  const fileContentsPromises = cssFiles.map(async (cssFile) => {
    const filePath = path.join(stylesDir, cssFile);
    return await fs.readFile(filePath, 'utf-8');
  });
  console.log(fileContentsPromises);

}

cssMerge();
