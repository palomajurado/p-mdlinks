"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ext = ['markdown', 'mdown', 'mkdn', 'md', 'mkd', 'mdwn', 'mdtxt', 'mdtext', 'text', 'Rmd'];

var checkMD = function checkMD(file) {
  return ext.some(function (v) {
    return v === (0, _path.basename)(file).split('.').pop();
  });
};

var isDirectory = function isDirectory(route) {
  return !!_fs["default"].lstatSync(route) && _fs["default"].lstatSync(route).isDirectory();
};

var isFile = function isFile(route) {
  return !!_fs["default"].lstatSync(route) && _fs["default"].statSync(route).isFile();
};

var getPath = function getPath(route) {
  return (0, _path.join)(process.cwd(), route);
};

var createId = function createId(file, index) {
  return "".concat((0, _path.basename)(file).split('.').shift(), "-").concat(index + 1);
};

module.exports = {
  checkMD: checkMD,
  isDirectory: isDirectory,
  isFile: isFile,
  getPath: getPath,
  createId: createId
};