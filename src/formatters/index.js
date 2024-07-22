import plainFormat from './plain.js';
import jsonFormat from './json.js';
import styleFormat from './style.js'; 

const format = (diff, outputFormat) => {
  switch (outputFormat) {
    case 'style':
      return styleFormat(diff);
    case 'plain':
      return plainFormat(diff);
    case 'json':
      return jsonFormat(diff);
    default:
      throw new Error(`Unknown output format: '${outputFormat}'!`);
  }
};

export default format;