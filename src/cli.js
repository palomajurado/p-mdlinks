import mdLinks from './index';
import chalk from 'chalk';

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

const cli = (path, options) =>
  mdLinks(path, options)
    .then((links) => {
      if (Array.isArray(links) && !!options && options.validate) {
        if (options.stats) linksStats(links, true);
        else
          links.forEach(({ href, status, statusText, text }) =>
            console.log(
              ` ${chalk.yellow(path)} ${chalk.cyan(href)} ${chalk.magenta(
                statusText
              )} ${chalk.magenta(status)} ${chalk.blue(text)} `
            )
          );
      } else if (Array.isArray(links) && !!options && options.stats)
        linksStats(links);
      else
        links.forEach(({ href, text }) =>
          console.log(
            ` ${chalk.yellow(path)} ${chalk.cyanBright(href)} ${chalk.blue(
              text
            )} `
          )
        );
    })
    .catch((err) => console.error(err));

// cli("pepe", { validate: false, stats: false });
// cli("src/README.md", { stats: true, validate: false });
// cli("pepe", { stats: true, validate: true });
// cli("pepe", { validate: true, stats: false });

// .then((res) => console.log("me salio", res))
// .catch(console.log);

module.exports = cli;
