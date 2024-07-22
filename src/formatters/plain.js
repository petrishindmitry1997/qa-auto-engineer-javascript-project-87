const statusUnchanged = (diffObject) => Object.keys(diffObject).filter((key) => 
  diffObject[key].type === 'added'
  || diffObject[key].type === 'deleted'
  || diffObject[key].type === 'updated');

const status = {
  added: (node, path) => `Property '${path}' was added with value: ${node.value}`,
  deleted: (node, path) => `Property '${path}' was removed`,
  updated: (node, path) => `Property '${path}' was updated. From ${node.old} to ${node.new}`,
  unchanged: 'not used',
};

const stringToArray = (diffObject) => statusUnchanged(diffObject).map((key) => {
  const node = diffObject[key];
  if (Object.hasOwn(status, node.type)) return status[node.type](diffObject[key], key);
  throw new Error(`Unexpected status '${node.type}' for ${key}`);
});
const plainFormat = (diffObject) => stringToArray(diffObject).join('\n');

export default plainFormat;
