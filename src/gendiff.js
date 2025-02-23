import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileData = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileData);
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const allKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2))); 

  const result = allKeys.map((key) => {
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`; 
    }
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`; 
    }
    if (_.isEqual(data1[key], data2[key])) {
      return `    ${key}: ${data1[key]}`; 
    }
    return [`  - ${key}: ${data1[key]}`, `  + ${key}: ${data2[key]}`].join('\n');
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
