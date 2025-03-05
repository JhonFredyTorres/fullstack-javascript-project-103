import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (value === null) {
    return 'null';
  }
  return String(value);
};

const formatPlain = (diff) => {
  const iter = (nodes, path) => {
    const lines = nodes
      .filter((node) => node.type !== 'unchanged')
      .map((node) => {
        const newPath = path ? `${path}.${node.key}` : node.key;

        switch (node.type) {
          case 'nested':
            return iter(node.children, newPath);
          case 'added':
            return `Property '${newPath}' was added with value: ${formatValue(node.value)}`;
          case 'deleted':
            return `Property '${newPath}' was removed`;
          case 'changed':
            return `Property '${newPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
          default:
            throw new Error(`Unknown type: ${node.type}`);
        }
      });

    return lines.join('\n');
  };

  // Aseguramos que no haya espacios en blanco al final
  return iter(diff, '').trim();
};

export default formatPlain;