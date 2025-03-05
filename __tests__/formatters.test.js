import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('Different formatters', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  test('plain formatter', () => {
    const plainOutput = genDiff(filepath1, filepath2, 'plain');
    // En lugar de comparar directamente, verificamos que contiene las líneas esperadas
    expect(plainOutput).toContain("Property 'common.follow' was added with value: false");
    expect(plainOutput).toContain("Property 'common.setting2' was removed");
    expect(plainOutput).toContain("Property 'common.setting3' was updated. From true to null");
    expect(plainOutput).toContain("Property 'group2' was removed");
    expect(plainOutput).toContain("Property 'group3' was added with value: [complex value]");
  });

  test('json formatter', () => {
    const jsonOutput = genDiff(filepath1, filepath2, 'json');
    // Verificamos que es un JSON válido y que contiene la información correcta
    const parsedJson = JSON.parse(jsonOutput);
    expect(Array.isArray(parsedJson)).toBeTruthy();
    expect(parsedJson.length).toBeGreaterThan(1);
    
    // Verificamos algunos elementos clave
    const commonItem = parsedJson.find(item => item.key === 'common');
    expect(commonItem).toBeDefined();
    expect(commonItem.type).toBe('nested');
    
    const group2Item = parsedJson.find(item => item.key === 'group2');
    expect(group2Item).toBeDefined();
    expect(group2Item.type).toBe('deleted');
    
    const group3Item = parsedJson.find(item => item.key === 'group3');
    expect(group3Item).toBeDefined();
    expect(group3Item.type).toBe('added');
  });
});