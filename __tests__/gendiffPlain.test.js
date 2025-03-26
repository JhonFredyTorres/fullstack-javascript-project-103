import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff plain format - JSON files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
  
    const expected = readFile('expected_plain.txt')
      .trim()
      .split(/\r?\n/) 
      .map((line) => line.trim());
  
    const result = genDiff(file1, file2, 'plain')
      .trim()
      .split('\n')
      .map((line) => line.trim());
  
    expect(result).toEqual(expected);
  });
  
  
  
