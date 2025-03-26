import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff json format - JSON files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const result = genDiff(file1, file2, 'json');
  const parsed = JSON.parse(result); 

  expect(parsed).toBeInstanceOf(Array); 
  expect(parsed[0]).toHaveProperty('key'); 
});
