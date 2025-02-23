#!/usr/bin/env node
// @ts-check

import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'first configuration file')
  .argument('<filepath2>', 'second configuration file')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);

// Obtiene los valores de los argumentos y opciones
const options = program.opts();
const [filepath1, filepath2] = program.args;

// Simulación de salida
console.log(`Comparing files: ${filepath1} vs ${filepath2}`);
console.log(`Selected format: ${options.format || 'default'}`);
