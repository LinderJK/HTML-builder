const fs = require('fs/promises');
const path = require('path');

const distrDirName = 'project-dist';
const distrDir = path.resolve(__dirname, distrDirName);


const createDir = async () => {
  await fs.mkdir(distrDir, { recursive: true});
}



(async () => {
  try {
    await Promise.all([createDir()]);
    console.log('Build completed successfully.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
