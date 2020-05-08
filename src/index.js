import fs from 'fs';
import axios from 'axios';
import chalk from 'chalk';
import { checkMD, isDirectory, isFile, getPath, createId } from './utils';

const expectMDLink = /\[([^\]]*)\]\(([^)]*)\)/g;
const filesMDLinks = [];
const filesPromises = [];
const linksValidatePromises = [];
const pathsMdFiles = [];

/* ------------------------------------ */
const getFilesMdInDir = (route) =>
  fs.readdirSync(getPath(route)).forEach((fileOrDir) => {
    const newRoute = `${route}/${fileOrDir}`;
    if (isDirectory(newRoute)) getFilesMdInDir(newRoute);
    if (isFile(newRoute) && checkMD(newRoute))
      pathsMdFiles.push(getPath(newRoute));
  });

/* ------------------------------------ */
const getLinksInFileMd = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, fileData) => {
      if (fileData && Array.isArray(fileData.match(expectMDLink))) {
        const links = fileData
          .match(expectMDLink)
          .map((v) => v.split('](')[1].slice(0, -1));
        const textLinks = fileData
          .match(expectMDLink)
          .map((v) => v.split('](')[0].slice(1));
        links.forEach((link, i) =>
          filesMDLinks.push({
            id: createId(filePath, i),
            href: link,
            text: textLinks[i],
            file: filePath,
          })
        );
        resolve(filesMDLinks);
      } else reject(err);
    });
  });

/* ------------------------------------ */
const linkValidate = (id, url) =>
  new Promise((resolve) =>
    axios(url)
      .then((res) =>
        resolve({ id, status: res.status, statusText: res.statusText })
      )
      .catch(() => resolve({ id, status: 404, statusText: 'FAIL' }))
  );

/* ------------------------------------ */
const mdLinks = (route, options) =>
  new Promise((resolve, reject) => {
    if (route) {
      const pathRoute = getPath(route);
      if (fs.existsSync(pathRoute) && !!fs.lstatSync(pathRoute)) {
        if (isDirectory(pathRoute)) getFilesMdInDir(route);
        if (isFile(pathRoute) && checkMD(pathRoute))
          pathsMdFiles.push(pathRoute);

        pathsMdFiles
          .reverse()
          .forEach((file) => filesPromises.push(getLinksInFileMd(file)));
        Promise.all(filesPromises)
          .then((res) => res.flat(Infinity))
          .then((links) => {
            if (Array.isArray(links)) {
              if (!!options && options.validate) {
                links.forEach(({ id, href }) =>
                  linksValidatePromises.push(linkValidate(id, href))
                );
                Promise.all(linksValidatePromises)
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
                  `${chalk.red('NOT found md files at')} ${chalk.yellow(route)}`
                )
              );
          })
          .catch(() =>
            reject(
              new Error(
                `${chalk.red('NOT found links')} ${chalk.yellow(route)}`
              )
            )
          );
      } else
        reject(
          new Error(
            chalk.red(
              'Path:⚠️  NOT FOUND (check the NAME of DIR \\ FILE or .md)⚠️  )'
            )
          )
        );
    } else
      reject(
        new Error(
          chalk.yellow.bold('---> The <path> argument is required <---\n')
        )
      );
  });

/* ------------------------------------ */

module.exports = { mdLinks, linkValidate };
