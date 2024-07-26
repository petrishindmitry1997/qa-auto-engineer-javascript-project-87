import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'UTF-8');

test.each([
  ['flat1.json', 'flat2.json', 'expectedStyle.txt'],
  ['flat1.yml', 'flat2.yml', 'expectedStyle.txt'],
  ['flat1.yml', 'flat2.yml', 'expectedPlain.txt'],
  ['flat1.json', 'flat2.json', 'expectedJson.txt'],
])('gendiff flat comparison between two files', (file1, file2, expectedResult) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2))).toEqual(readFile(expectedResult));
});

test('gendiff unsupported file', () => {
  const file1 = getFixturePath('flat1.json');
  const file2 = getFixturePath('flat2.json');

  expect(() => genDiff(file1, file2, 'unsupported file')).toThrow('Error');
});
