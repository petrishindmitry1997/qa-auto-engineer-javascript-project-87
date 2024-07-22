import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'UTF-8');

test('gendiff flat json', () => {
  const file1 = getFixturePath('flat1.json');
  const file2 = getFixturePath('flat2.json');

  expect(genDiff(file1, file2)).toEqual(readFile('expectedStyle.txt'));
});

test('gendiff flat yaml', () => {
  const file1 = getFixturePath('flat1.yml');
  const file2 = getFixturePath('flat2.yml');

  expect(genDiff(file1, file2)).toEqual(readFile('expectedStyle.txt'));
});

test('gendiff format plain', () => {
  const file1 = getFixturePath('flat1.yml');
  const file2 = getFixturePath('flat2.yml');

  expect(genDiff(file1, file2, 'plain')).toEqual(readFile('expectedPlain.txt'));
});

test('gendiff format json', () => {
  const file1 = getFixturePath('flat1.json');
  const file2 = getFixturePath('flat2.json');

  expect(genDiff(file1, file2, 'json')).toEqual(readFile('expectedJson.txt'));
});

test('gendiff unsupported file', () => {
  const file1 = getFixturePath('flat1.json');
  const file2 = getFixturePath('flat2.json');

  expect(() => genDiff(file1, file2, 'unsupported file')).toThrow('Error');
});
