import fs from 'fs';
import { basename, join } from 'path';

const ext = [
  'markdown',
  'mdown',
  'mkdn',
  'md',
  'mkd',
  'mdwn',
  'mdtxt',
  'mdtext',
  'text',
  'Rmd',
];

const getPath = (route) => join(process.cwd(), route); // C:\\Users\\Pc\\Desktop\\cri\\test-md-links-master\\README.md

const isFile = (route) => !!fs.lstatSync(route) && fs.lstatSync(route).isFile(); // ./readme.md

const isDirectory = (route) =>
  !!fs.lstatSync(route) && fs.lstatSync(route).isDirectory(); // ./src/readme.md

const checkMD = (file) =>
  ext.some((strExt) => strExt === basename(file).split('.').pop());

const createId = (file, index) =>
  `${basename(file).split('.').shift()}-${index + 1}`;

module.exports = {
  checkMD,
  isDirectory,
  isFile,
  getPath,
  createId,
};
