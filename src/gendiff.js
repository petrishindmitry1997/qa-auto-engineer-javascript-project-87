import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import format from './formatters/index.js';
import parse from './parser.js';
import buildDiff from './buildDiff.js';

const makeFullPath = (path1) => path.resolve(path1);

const getData = (filePath) => {
  const fileFormat = path.extname(filePath).slice(1);
  const data = fs.readFileSync(filePath, 'UTF-8');

  return parse(data, fileFormat);
};

const genDiff = (filepath1, filepath2, outputFormat = 'style') => {
  const object1 = getData(makeFullPath(filepath1));
  const object2 = getData(makeFullPath(filepath2));

  const diffObject = buildDiff(object1, object2);
  return format(diffObject, outputFormat);
};

export default genDiff;
