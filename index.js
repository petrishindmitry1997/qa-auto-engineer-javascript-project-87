import _ from 'lodash';
import fs from 'fs';
import path from 'path'; 

const buildDiff = (object1, object2) => {
    const keys = _.union(Object.keys(object1), Object.keys(object2));
    const sortedKeys = _.sortBy(keys);

    return sortedKeys;
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
