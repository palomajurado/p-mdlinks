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

const checkMD = (file) =>
  ext.some((v) => v === basename(file).split('.').pop());
const isDirectory = (route) =>
  !!fs.lstatSync(route) && fs.lstatSync(route).isDirectory();
const isFile = (route) => !!fs.lstatSync(route) && fs.statSync(route).isFile();
const getPath = (route) => join(process.cwd(), route);
const createId = (file, index) =>
  `${basename(file).split('.').shift()}-${index + 1}`;

module.exports = {
  checkMD,
  isDirectory,
  isFile,
  getPath,
  createId,
};
