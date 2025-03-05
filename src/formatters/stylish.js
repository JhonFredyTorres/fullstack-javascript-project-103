import _ from 'lodash';

const SPACES_COUNT = 4;

const getIndent = (depth) => ' '.repeat(depth * SPACES_COUNT - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    if (value === null) return 'null';
    if (value === '') return '';
    return String(value);
  }

  const bracketIndent = ' '.repeat(depth * SPACES_COUNT);
  const lines = Object.entries(value)
    .map(([key, val]) => `${bracketIndent}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${' '.repeat((depth - 1) * SPACES_COUNT)}}`
  ].join('\n');
};

const formatStylish = (diff) => {
  const iter = (nodes, depth = 1) => {
    const indent = getIndent(depth);

    const lines = nodes.map((node) => {
      const { key, type } = node;

      switch (type) {
        case 'nested': {
          return `${indent}  ${key}: {\n${iter(node.children, depth + 1)}\n${indent}  }`;
        }
        case 'added':
          return `${indent}+ ${key}: ${stringify(node.value, depth + 1)}`;
        case 'deleted':
          return `${indent}- ${key}: ${stringify(node.value, depth + 1)}`;
        case 'unchanged':
          return `${indent}  ${key}: ${stringify(node.value, depth + 1)}`;
        case 'changed': {
          return [
            `${indent}- ${key}: ${stringify(node.oldValue, depth + 1)}`,
            `${indent}+ ${key}: ${stringify(node.newValue, depth + 1)}`
          ].join('\n');
        }
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });

    return lines.join('\n');
  };

  return `{\n${iter(diff)}\n}`;
};

export default formatStylish;