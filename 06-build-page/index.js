const fs = require('fs/promises');
const path = require('path');

const distrDirName = 'project-dist';
const distrDir = path.resolve(__dirname, distrDirName);


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




(async () => {
  try {
    await Promise.all([createDir(), replaceTags()]);
    console.log('Build completed successfully.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
