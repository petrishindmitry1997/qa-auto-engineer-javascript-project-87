const status = {
  deleted: (node, path) => `  - ${path}: ${node.value}`,
  updated: (node, path) => `  - ${path}: ${node.old}\n  + ${path}: ${node.new}`,
  added: (node, path) => `  + ${path}: ${node.value}`,
};

const stringToArray = (diffObject) => Object.keys(diffObject).map((key) => {
  const node = diffObject[key];
  if (Object.hasOwn(status, node.type)) {
    return status[node.type](diffObject[key], key);
  }
  throw new Error(`${key} of '${node.type}' is unexpected`);
});

const styleFormat = (diffObject) => `{\n${stringToArray(diffObject).join('\n')}\n}`;

export default styleFormat;
