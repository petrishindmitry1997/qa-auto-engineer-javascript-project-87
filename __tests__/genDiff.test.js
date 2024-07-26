import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'UTF-8');

const testCases = [
  ['flat1.json', 'flat2.json', 'expectedStyle.txt', undefined],
  ['flat1.yml', 'flat2.yml', 'expectedStyle.txt', undefined],
  ['flat1.yml', 'flat2.yml', 'expectedPlain.txt', 'plain'],
  ['flat1.json', 'flat2.json', 'expectedJson.txt', 'json'],
];

test.each(testCases)('gendiff test comparison between two files', (file1, file2, expected, format) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), format)).toEqual(readFile(expected));
});

test('gendiff unsupported file', () => {
  const file1 = getFixturePath('flat1.json');
  const file2 = getFixturePath('flat2.json');

  expect(() => genDiff(file1, file2, 'unsupported file')).toThrow('Error');
});
