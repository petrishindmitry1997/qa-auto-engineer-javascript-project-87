import YAML from 'yaml';

const formats = {
  json: (data) => JSON.parse(data),
  yml: (data) => YAML.parse(data),
  yaml: (data) => YAML.parse(data),
};
const parse = (data, format) => {
  if (Object.hasOwn(formats, format)) return formats[format](data);

  console.log(`${format} file format is not supported.`);

  throw new Error(`Unsupported format ${format}`);
};

export default parse;
