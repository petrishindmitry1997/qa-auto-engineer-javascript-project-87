import plainFormat from './plain.js';
import jsonFormat from './json.js';

export default (diff, outputFormat) => {
  switch (outputFormat) {
    case 'plain':
      return plainFormat(diff);
    case 'json':
      return jsonFormat(diff);
    default:
      throw new Error(`Unknown output format: '${outputFormat}'!`);
  }
};
