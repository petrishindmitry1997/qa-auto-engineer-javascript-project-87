import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import format from './formatters/index.js';
import parse from './parser.js';

const buildDiff = (object1, object2) => {
  const allKeys = Object.keys(object1).concat(Object.keys(object2));
  const uniqueKeys = Array.from(new Set(allKeys));
  const sortedKeys = uniqueKeys.sort();
  return sortedKeys.reduce((acc, currentKey) => {
    if (object2[currentKey] === undefined) {
      return { ...acc, [currentKey]: { type: 'deleted', value: object1[currentKey] } };
    }
    if (object1[currentKey] === undefined) {
      return { ...acc, [currentKey]: { type: 'added', value: object2[currentKey] } };
    }
    if (object1[currentKey] === object2[currentKey]) {
      return { ...acc, [currentKey]: { type: 'unchanged', value: object1[currentKey] } };
    }
    return { ...acc, [currentKey]: { type: 'updated', old: object1[currentKey], new: object2[currentKey] } };
  }, {});
};

const makeFullPath = (path1) => path.resolve(path1);

const getData = (filePath) => {
  const fileFormat = path.extname(filePath).slice(1);
  const data = fs.readFileSync(filePath, 'UTF-8');

  return parse(data, fileFormat);
};

const genDiff = (filepath1, filepath2, outputFormat) => {
  const object1 = getData(makeFullPath(filepath1));
  const object2 = getData(makeFullPath(filepath2));

  const diffObject = buildDiff(object1, object2);
  return format(diffObject, outputFormat);
};

export default genDiff;
