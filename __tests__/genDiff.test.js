import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/gendiff-src.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('gendiff flat json', () => {
  const file1 = getFixturePath('flat1.json');
  const file2 = getFixturePath('flat2.json');

  expect(genDiff(file1, file2)).toEqual(readFile('expectedFlat.txt'));
});

test('gendiff flat yaml', () => {
    const file1 = getFixturePath('flat1.yml');
    const file2 = getFixturePath('flat2.yml');
  
    expect(genDiff(file1, file2)).toEqual(readFile('expectedFlat.txt'));
});

  test('gendiff --format plain', () => {
    const file1 = getFixturePath('flat1.yml');
    const file2 = getFixturePath('flat2.yml');
  
    expect(genDiff(file1, file2, 'plain')).toEqual(readFile('expectedPlain.txt'));
}); 

test('gendiff --format json', () => {
  const file1 = getFixturePath('flat1.json');
  const file2 = getFixturePath('flat2.json');

  expect(genDiff(file1, file2, 'json')).toEqual(readFile('expectedFlat.txt'));
});

test('gendiff unsupported file', () => {
  const file1 = getFixturePath('flat1.json');
  const file2 = getFixturePath('flat2.json');

  expect(genDiff(file1, file2, 'unsupported file')).toHaveBeenCalledWith('Error');
});
