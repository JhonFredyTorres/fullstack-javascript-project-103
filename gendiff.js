#!/usr/bin/env node
// @ts-check

import { Command } from 'commander';


const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);
