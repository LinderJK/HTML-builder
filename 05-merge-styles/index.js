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


}

cssMerge();
