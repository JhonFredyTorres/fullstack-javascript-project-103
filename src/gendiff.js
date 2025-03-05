import _ from 'lodash';
import parseFile from './parse.js';
import getFormatter from './formatters/index.js';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: buildDiff(data1[key], data2[key]) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        type: 'changed',
        oldValue: data1[key],
        newValue: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);
  
  const formatter = getFormatter(formatName);
  return formatter(diff);
};

export default genDiff;