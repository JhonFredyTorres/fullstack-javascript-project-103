import formatPlain from '../src/formatters/plain.js';

test('formatPlain renders plain text diff correctly', () => {
  const diff = [
    { key: 'host', type: 'unchanged', value: 'hexlet.io' },
    { key: 'timeout', type: 'changed', oldValue: 50, newValue: 20 },
    { key: 'proxy', type: 'deleted', value: '123.234.53.22' },
    { key: 'verbose', type: 'added', value: true },
    {
      key: 'config',
      type: 'nested',
      children: [
        { key: 'mode', type: 'added', value: 'advanced' },
        { key: 'retry', type: 'changed', oldValue: null, newValue: 3 },
      ],
    },
  ];

  const expected = [
    "Property 'timeout' was updated. From 50 to 20",
    "Property 'proxy' was removed",
    "Property 'verbose' was added with value: true",
    "Property 'config.mode' was added with value: 'advanced'",
    "Property 'config.retry' was updated. From null to 3",
  ].join('\n');

  expect(formatPlain(diff)).toEqual(expected);
});
