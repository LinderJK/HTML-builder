const fs = require('fs/promises');
const path = require('path');

const distrDirName = 'project-dist';
const distrDir = path.resolve(__dirname, distrDirName);
const assetsPath = path.join(__dirname, 'assets');
const assetsCopyPath = path.join(distrDir, 'assets');

const createDir = async () => {
  await fs.mkdir(distrDir, { recursive: true});
}

async function replaceTags() {
  const templatePath = path.join(__dirname, 'template.html');
  const templateContent = await fs.readFile(templatePath, 'utf-8');

  const componentsPath = path.join(__dirname, 'components');
  const componentFiles = await fs.readdir(componentsPath);

  console.log(componentFiles, typeof componentFiles);
  let resultContent = templateContent;
  for (const componentFile of componentFiles) {
    // console.log(componentFile, 'file', typeof componentFile);
    const componentPath = path.join(componentsPath, componentFile);
    // console.log(componentPath, 'path', typeof componentPath);
    const componentName = path.basename(componentFile,'.html');
    // console.log(componentName, 'name', typeof componentName);
    const componentContent = await fs.readFile(componentPath, 'utf-8');
    // console.log(componentContent, 'content', typeof componentContent);
    const tagToReplace = `{{${componentName}}}`;
    console.log(tagToReplace, 'tagToRaplace');
    resultContent = resultContent.replace(
      new RegExp(tagToReplace, 'g'),
      componentContent,
    );
  }

  const outputFile = path.join(distrDir, 'index.html');
  await fs.writeFile(outputFile, resultContent, 'utf-8');
}

async function buildCss () {
  const cssPath = path.join(__dirname, 'styles');
  const cssBuildFile = path.join(distrDir, 'style.css');

  const files = await fs.readdir(cssPath);

  const cssFiles = files.filter((file) => path.extname(file) === '.css');
  console.log(cssFiles, 'cssFiles');

  const fileContentsPromises = cssFiles.map(async (cssFile) => {
    const filePath = path.join(cssPath, cssFile);
    return await fs.readFile(filePath, 'utf-8');
  });

  const fileContents = await Promise.all(fileContentsPromises);
  await fs.writeFile(cssBuildFile, fileContents.join('\n'), 'utf-8');
}

async function copyDir(source, destination) {
  const stats = await fs.stat(source);
  if (stats.isFile()) {
    await fs.copyFile(source, destination);
  } else if (stats.isDirectory()) {
    await copyDirRecursive(source, destination);
  }
}

async function copyDirRecursive(source, destination) {
  await fs.mkdir(destination, { recursive: true });
  const files = await fs.readdir(source);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    await copyDir(sourcePath, destinationPath);
  }
}

(async () => {
  try {
    await Promise.all([
      createDir(),
      replaceTags(),
      buildCss(),
      copyDir(assetsPath, assetsCopyPath),
    ]);
    console.log('Build completed successfully.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
