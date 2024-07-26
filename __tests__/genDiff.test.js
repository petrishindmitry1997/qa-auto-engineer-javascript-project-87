import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'UTF-8');

describe('gendiff two files', () => {
  const testCases = [
    ['flat1.json', 'flat2.json', 'style', 'expectedStyle.txt'],
    ['flat1.yml', 'flat2.yml', 'style', 'expectedStyle.txt'],
    ['flat1.yml', 'flat2.yml', 'plain', 'expectedPlain.txt'],
    ['flat1.json', 'flat2.json', 'json', 'expectedJson.txt'],
  ];

  test.each(testCases)('comparison between two files', (file1, file2, format, expectedResult) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);

    expect(genDiff(filepath1, filepath2, format)).toEqual(readFile(expectedResult));
  });
});

test('gendiff unsupported file', () => {
  const filepath1 = getFixturePath('flat1.json');
  const filepath2 = getFixturePath('flat2.json');

  expect(() => genDiff(filepath1, filepth2, 'unsupported file')).toThrow('Error');
});
