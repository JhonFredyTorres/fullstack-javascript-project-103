import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const getFormatter = (formatName) => {
  switch (formatName.toLowerCase()) {
    case 'stylish':
      return formatStylish;
    case 'plain':
      return formatPlain;
    case 'json':
      return formatJson;
    default:
      throw new Error(`Unknown format: ${formatName}. Available formats are: stylish, plain, json`);
  }
};

export default getFormatter;