import parseFile from './parse.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => { 
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  console.log('Comparing files:', filepath1, 'vs', filepath2);
  console.log('File 1 content:', data1);
  console.log('File 2 content:', data2);
  console.log('Selected format:', format);

  return 'Diff function is under construction';
};

export default genDiff;
