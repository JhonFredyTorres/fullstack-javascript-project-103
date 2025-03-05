import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('genDiff', () => {
  const expectedOutput = readFile('expected_output.txt');

  test('compares two JSON files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(genDiff(filepath1, filepath2)).toEqual(expectedOutput);
  });

  test('compares two YAML files', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    expect(genDiff(filepath1, filepath2)).toEqual(expectedOutput);
  });

  test('compares JSON and YAML files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.yml');
    expect(genDiff(filepath1, filepath2)).toEqual(expectedOutput);
  });
});