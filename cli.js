#!/usr/bin/env node
'use strict';
const commander = require('commander');
const chalk = require('chalk');
const mdLinksCLI = require('./lib/cli');
const packageJson = require('./package.json');

const program = new commander.Command(packageJson.name)
  .version(chalk.magenta.bold('packageJson.version'))
  .arguments('<path>')
  .usage(`${chalk.green('<path>')} [options]`)
  .option('-v, --validate')
  .option('-s, --stats')
  .on('--help', () => {
    console.log(`\n Only ${chalk.green('<path>')} is required.\n`);
    console.log(`An option ${chalk.cyan('--validate')} is for:`);
    console.log(
      ` ${chalk.magenta('- Check and validate all links in your md files')}`
    );
    console.log(
      ` ${chalk.magenta(
        '- Will return all information like this: path, link, name, status code, and status text'
      )}\n`
    );

    console.log(`An option ${chalk.cyan('--stats')} is for:`);
    console.log(
      ` ${chalk.magenta(
        '- Check and get information about which links are unique and the total of links you have'
      )}\n`
    );
    console.log(`Both options ${chalk.cyan('--validate --stats')} are for:`);
    console.log(
      ` ${chalk.magenta(
        '- Check and get information about which links are unique, broken and the total of links you have'
      )}\n`
    );
    console.log(
      `${chalk.bgYellow.black(
        'If you have any problems, do not hesitate to file an issue '
      )}`
    );
    console.log(
      ` ${chalk.cyan(
        'https://github.com/yeniferPaloma/test-md-links/issues/new'
      )}\n`
    );
  });

program.parse(process.argv);

if (!program.validate && !program.stats) mdLinksCLI(process.argv[2]);
if (!!program.validate && !program.stats)
  mdLinksCLI(process.argv[2], { validate: program.validate });
if (!program.validate && !!program.stats)
  mdLinksCLI(process.argv[2], { stats: program.stats });
if (!!program.validate && !!program.stats)
  mdLinksCLI(process.argv[2], {
    validate: program.validate,
    stats: program.stats,
  });
