const statusRn = (diffObject) => Object.keys(diffObject).filter((key) => ['added', 'deleted', 'updated'].includes(diffObject[key].type));

const solution = {
  deleted: (node, path) => `Property '${path}' was removed`,
  updated: (node, path) => `Property '${path}' was updated. From ${node.old} to ${node.new}`,
  added: (node, path) => `Property '${path}' was added with value: ${node.value}`,
};

const stringToArray = (diffObject) => statusRn(diffObject).map((key) => {
  const node = diffObject[key];
  if (Object.hasOwn(solution, node.type)) {
    return solution[node.type](diffObject[key], key);
  }
  throw new Error(`Unexpected solution '${node.type}' for ${key}`);
});
const plainFormat = (diffObject) => stringToArray(diffObject).join('\n');

export default plainFormat;
