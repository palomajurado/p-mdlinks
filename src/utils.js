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

const checkMD = (path) =>
  ext.some((v) => v === basename(path).split('.').pop());
const isDirectory = (path) =>
  !!fs.lstatSync(path) && fs.lstatSync(path).isDirectory();
const isFile = (path) => !!fs.lstatSync(path) && fs.statSync(path).isFile();
const getPath = (path) => join(process.cwd(), path);
const createId = (path, index) =>
  `${basename(path).split('.').shift()}-${index + 1}`;

module.exports = {
  checkMD,
  isDirectory,
  isFile,
  getPath,
  createId,
};
