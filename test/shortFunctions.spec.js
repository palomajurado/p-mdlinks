/* eslint-disable prettier/prettier */
const { getPath } = require('../lib/shortFunctions');
const { isDirectory } = require('../lib/shortFunctions');
const { isFile } = require('../lib/shortFunctions');
const { checkMD } = require('../lib/shortFunctions');

describe('Read the path', () => {
  it('Should return a absolute path', () => {
    expect(getPath('./README.md')).toBe(
      'C:\\Users\\Pc\\Desktop\\markDown\\LIM012-fe-md-links\\README.md'
    );
  });
  it('Should return a relative path', () => {
    expect(getPath('README.md')).toBe(
      'C:\\Users\\Pc\\Desktop\\markDown\\LIM012-fe-md-links\\README.md'
    );
  });
  it('Should return an absolute path directory', () => {
    expect(getPath('./src')).toBe(
      'C:\\Users\\Pc\\Desktop\\markDown\\LIM012-fe-md-links\\src'
    );
  });
  it('Should return a relative path directory', () => {
    expect(getPath('src')).toBe(
      'C:\\Users\\Pc\\Desktop\\markDown\\LIM012-fe-md-links\\src'
    );
  });
});

describe('is directory', () => {
  it('Return true if is a directory', () => {
    expect(isDirectory(getPath('src'))).toBe(true);
  });
  it('Should return false if absolute path is not a directory', () => {
    expect(isDirectory(getPath('./README.md'))).toBe(false);
  });
});

describe('Is file ', () => {
  it('Return true if is a file', () => {
    expect(isFile(getPath('./README.md'))).toBe(true);
  });
  it('Should return false if absolute path is not a file', () => {
    expect(isFile(getPath('src'))).toBe(false);
  });
});

describe('Cheking if the file is markdown', () => {
  it('Should be a markDown file', () => {
    expect(checkMD('README.md')).toBe(true);
  });
  it('Should be a markDown file', () => {
    expect(checkMD('src/index.js')).toBe(false);
  });
});
