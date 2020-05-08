import { mdLinks } from './index';
import chalk from 'chalk';

// Este sera el archivo que contendra la funcion a ejecutarse en el CLI
const linksStats = (links, isValidate) => {
  const total = links.length;
  const arrHref = links.map(({ href }) => href);
  const unique = [...new Set(arrHref)].length;
  const failedLinks =
    isValidate && links.filter(({ statusText }) => statusText === 'FAIL');
  const broken = Array.isArray(failedLinks) ? failedLinks.length : 0;
  const successMessage = chalk.green(
    `✔ Total : ${total}\n✔ Unique : ${unique}`
  );
  console.log(
    isValidate
      ? `${successMessage}\n${chalk.red(`✖ Broken : ${broken}`)}`
      : successMessage
  );
};

// Definimos una funcion principal que ejecutara mdLinks
const cli = (path, options) => {
  if (path) {
    mdLinks(path, options)
      .then((links) => {
        if (Array.isArray(links) && !!options && options.validate) {
          if (options.stats) linksStats(links, true);
          else
            links.forEach(({ file, href, status, statusText, text }) => {
              console.log(
                `${chalk.yellow(file)} ${chalk.cyan(href)} ${chalk.magenta(
                  statusText
                )} ${chalk.magenta(status)} ${chalk.blue(text)}`
              );
            });
        } else if (Array.isArray(links) && !!options && options.stats)
          linksStats(links);
        else
          links.forEach(({ file, href, text }) =>
            console.log(
              `⨭ ${chalk.yellow.underline(file)} 🡲 ${chalk.cyanBright(
                href
              )}...${chalk.blue(text)}`
            )
          );
      })
      .catch(() =>
        console.log(
          `\n${chalk
            .rgb(227, 13, 219)
            .bold(
              '---> PLEASE CHECK THE PATH (is wrong or there`rnt links into .md)-->'
            )} ${chalk.bgRgb(227, 13, 219).yellow.bold(path)}\n `
        )
      );
  } else {
    // Si el usuario no pasa ningun path le saldra este aviso, con informacin sobre como debe ejecutar el comando CLI
    console.error(
      `\n${chalk.bgYellow
        .rgb(112, 19, 147)
        .bold('🡲  Please specify the path:  ')}`
    );
    console.log(
      `  ${chalk.cyan('p-mdlinks')} ${chalk.yellow.bold('<path>')}\n`
    );
    console.log(
      `\n${chalk.bgYellow.rgb(112, 19, 147).bold('🡲  For example:  ')}`
    );
    console.log(
      `  ${chalk.cyan('p-mdlinks')} ${chalk.yellow.bold('md_directory')}`
    );
    console.log(
      `  ${chalk.cyan('p-mdlinks')} ${chalk.yellow.bold('README.md')}\n`
    );
    console.log(
      `${chalk.bgYellow.rgb(112, 19, 147).bold('🡲  Run  ')}${chalk.cyan(
        `\n${'  p-mdlinks'} --help`
      )} ${chalk.yellow.bold('for info ')}\n`
    );
  }
};

module.exports = cli;
