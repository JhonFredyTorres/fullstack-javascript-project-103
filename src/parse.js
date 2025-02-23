import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileData = fs.readFileSync(absolutePath, 'utf-8');
  const fileExtension = path.extname(filepath).toLowerCase();

  if (fileExtension === '.json') {
    return JSON.parse(fileData);
  }
  if (fileExtension === '.yaml' || fileExtension === '.yml') {
    return yaml.load(fileData);
  }

  throw new Error(`Unsupported file format: ${fileExtension}`);
};

export default parseFile;
