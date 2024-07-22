import plainFormat from './plain.js';
import jsonFormat from './json.js';
import styleFormat from './style.js'; 

const formats = {
    json: (diffObject) => jsonFormat(diffObject),
    plain: (diffObject) => plainFormat(diffObject),
    stylish: (diffObject) => styleFormat(diffObject),
    unsupported: (formatName) => console.log(`Error: '${formatName}'`),
  };
  
  const format = (diffObject, formatName = 'stylish') => {
    if (Object.hasOwn(formats, formatName))
        return formats[formatName](diffObject);
  
    return formats.unsupported(formatName);
  };
  
  export default format;