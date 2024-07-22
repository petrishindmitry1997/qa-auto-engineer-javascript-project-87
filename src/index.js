import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import format from './formatters/index.js';
import parse from './parser.js';

const buildDiff = (object1, object2) => {
  const keys = _.union(Object.keys(object1), Object.keys(object2));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    const keyObject1 = _.has(object1, key);
    const keyObject2 = _.has(object2, key);
    if (keyObject1 && !keyObject2) return { type: 'deleted', key, value: object1[key] };
    if (!keyObject1 && keyObject2) return { type: 'added', key, value: object2[key] };

    if (!_.isEqual(object1[key], object2[key])) {
      return {
        type: 'updated', key, old: object1[key], new: object2[key],
      };
    }

    return { type: 'unchanged', key, value: object1[key] };
  });
};


const makeFullPath = (path1) => path.resolve(path1);
const getData = (fullPath) => {
  const file = fs.readFileSync(fullPath, 'utf-8');
  const fileFormat = path.extname(fullPath).substring(1);

  return parse(file, fileFormat);
};

const genDiff = (filepath1, filepath2, outputFormat) => {
  const object1 = getData(makeFullPath(filepath1));
  const object2 = getData(makeFullPath(filepath2));

  const diffObject = buildDiff(object1, object2);
  return format(diffObject, outputFormat);
};

export default genDiff;
