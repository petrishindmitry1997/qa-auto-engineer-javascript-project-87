import _ from 'lodash';

const buildDiff = (object1, object2) => {
  const allKeys = _.union(Object.keys(object1), Object.keys(object2));
  const sortedKeys = _.sortBy(allKeys);
  return sortedKeys.reduce((acc, currentKey) => {
    if (object2[currentKey] === undefined) {
      return { ...acc, [currentKey]: { type: 'deleted', value: object1[currentKey] } };
    }
    if (object1[currentKey] === undefined) {
      return { ...acc, [currentKey]: { type: 'added', value: object2[currentKey] } };
    }
    if (_.isEqual(object1[currentKey], object2[currentKey])) {
      return { ...acc, [currentKey]: { type: 'unchanged', value: object1[currentKey] } };
    }
    return { ...acc, [currentKey]: { type: 'updated', value1: object1[currentKey], value2: object2[currentKey] } };
  }, {});
};

export default buildDiff;
