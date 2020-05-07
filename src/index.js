import fs from 'fs';
import axios from 'axios';
import chalk from 'chalk';
import { checkMD, isDirectory, isFile, getPath, createId } from './utils';

const expectMDLink = /\[([^\]]*)\]\(([^)]*)\)/g;
const filesMDLinks = [];
const filesPromises = [];
const linkUrlsPromises = [];
const pathsMdFiles = [];

const getLinksInDirectoryFilesMD = (route) =>
  fs.readdirSync(getPath(route)).forEach((file) => {
    const newRoute = `${route}/${file}`;
    if (isDirectory(newRoute)) getLinksInDirectoryFilesMD(newRoute);
    if (isFile(newRoute) && checkMD(newRoute))
      pathsMdFiles.push(getPath(newRoute));
  });

const getLinksInFileMd = (file) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (data && Array.isArray(data.match(expectMDLink))) {
        const links = data
          .match(expectMDLink)
          .map((v) => v.split('](')[1].slice(0, -1));
        const textLinks = data
          .match(expectMDLink)
          .map((v) => v.split('](')[0].slice(1));

        links.forEach((link, i) =>
          filesMDLinks.push({
            id: createId(file, i),
            href: link,
            text: textLinks[i],
            file,
          })
        );

        resolve(filesMDLinks);
      } else reject(err);
    });
  });

const linkValidate = (id, url) =>
  new Promise((resolve) =>
    axios(url)
      .then((res) =>
        resolve({ id, status: res.status, statusText: res.statusText })
      )
      .catch(() => resolve({ id, status: 404, statusText: 'FAIL' }))
  );

const mdLinks = (route, options) =>
  new Promise((resolve, reject) => {
    if (route) {
      const pathRoute = getPath(route);
      if (fs.existsSync(pathRoute) && !!fs.lstatSync(pathRoute)) {
        if (isDirectory(pathRoute)) getLinksInDirectoryFilesMD(route);
        if (isFile(pathRoute) && checkMD(pathRoute))
          pathsMdFiles.push(pathRoute);
        pathsMdFiles
          .reverse()
          .forEach((file) => filesPromises.push(getLinksInFileMd(file)));
        Promise.all(filesPromises)
          .then((res) => res[filesPromises.length - 1])
          .then((links) => {
            if (Array.isArray(links)) {
              if (!!options && options.validate) {
                links.forEach(({ id, href }) =>
                  linkUrlsPromises.push(linkValidate(id, href))
                );
                Promise.all(linkUrlsPromises)
                  .then((stats) => {
                    const linksWithStats = links.map((link) => ({
                      ...link,
                      ...stats.find(({ id }) => id === link.id),
                    }));
                    resolve(linksWithStats);
                  })
                  .catch(() =>
                    reject(new Error(`NOT founds links to validate ${route}`))
                  );
              } else resolve(links);
            } else
              reject(
                new Error(
                  `${chalk
                    .bgRgb(211, 246, 18)
                    .rgb(228, 13, 222)
                    .bold('NOT found md files at')} ${chalk.yellow(route)}`
                )
              );
          })
          .catch(() =>
            reject(
              new Error(
                `${chalk
                  .bgRgb(211, 246, 18)
                  .rgb(228, 13, 222)
                  .bold('NOT found links')} ${chalk.yellow(route)}`
              )
            )
          );
      } else
        reject(
          new Error(
            chalk
              .bgRgb(211, 246, 18)
              .rgb(228, 13, 222)
              .bold(
                'Path:⚠️  NOT FOUND (check the NAME of DIR \\ FILE or .md)⚠️  )'
              )
          )
        );
    } else
      reject(
        new Error(
          chalk.bgRed.yellow.underline.bold(
            '---> The <path> argument is required <---\n'
          )
        )
      );
  });

// mdLinks('lib', { validate: true })
//   .then((res) => console.log('file without validate: ', res))
//   .catch(console.log);

module.exports = { mdLinks, linkValidate };
