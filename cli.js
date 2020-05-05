#!/usr/bin/env node
'use strict';

// Este sera el archivo que se ejecutara cuando el comando cli se ejecute
const commander = require('commander');
const chalk = require('chalk');
const mdLinksCLI = require('./dist/cli');
const packageJson = require('./package.json');

// En esta parte configuramos la version de la libreria, argumentos obligatorios como el path
// usage() es para la opcion --help que muestra los valores requeridos para el cli
// definimos los dos options para --validate y --stats con una descripcion
// y configuramos un mensaje base para informacion al usuario cuando ejecute:
// md-links --help
const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<path>')
  .usage(`${chalk.green('<path>')} [options]`)
  .option('-v, --validate', 'validate links in md files')
  .option('-s, --stats', 'get stats of links in md files')
  .on('--help', () => {
    console.log(`Only ${chalk.green('<path>')} is required.\n`);
    console.log(`An option ${chalk.cyan('--validation')} is for:`);
    console.log(` - Check and validate all links in your md files`);
    console.log(
      ` - Will return all information like this: path, link, name, status code, and status text\n`
    );

    console.log(`An option ${chalk.cyan('--stats')} is for:`);
    console.log(
      ` - Check and get information about which links are unique and the total of links you have\n`
    );
    console.log(`Both options ${chalk.cyan('--validation --stats')} are for:`);
    console.log(
      ` - Check and get information about which links are unique, broken and the total of links you have\n`
    );
    console.log(`If you have any problems, do not hesitate to file an issue:`);
    console.log(
      ` ${chalk.cyan('https://github.com/christhoph/test-md-links/issues/new')}`
    );
  });

program.parse(process.argv);

// Creamos condicionales para evaluar los options y acorde a eso ejecutar la funcion mdLinks del cli
// En esta ocasion verificamos que no tenga ningun option y tomamos el argumento de la posicion 2 que es el path (process.argv[2])
if (!program.validate && !program.stats) mdLinksCLI(process.argv[2]);
// Aqui evaluamos si solo el option 'validate' este definido ya sea con -v o --validate
if (!!program.validate && !program.stats)
  mdLinksCLI(process.argv[2], { validate: program.validate });
// Aqui evaluamos si solo el option 'stats' este definido ya sea con -s o --stats
if (!program.validate && !!program.stats)
  mdLinksCLI(process.argv[2], { stats: program.stats });
// Aqui evaluamos si ambas opciones estan definidas ya sea -v -s o -s -v o --validate --stats o --stats --validate
if (!!program.validate && !!program.stats)
  mdLinksCLI(process.argv[2], {
    validate: program.validate,
    stats: program.stats,
  });
