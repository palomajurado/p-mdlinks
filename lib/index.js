"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _axios = _interopRequireDefault(require("axios"));

var _chalk = _interopRequireDefault(require("chalk"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var expectMDLink = /\[([^\]]*)\]\(([^)]*)\)/g;
var filesMDLinks = [];
var filesPromises = [];
var linkUrlsPromises = [];
var pathsMdFiles = [];

var getLinksInDirectoryFilesMD = function getLinksInDirectoryFilesMD(route) {
  return _fs["default"].readdirSync((0, _utils.getPath)(route)).forEach(function (file) {
    var newRoute = "".concat(route, "/").concat(file);
    if ((0, _utils.isDirectory)(newRoute)) getLinksInDirectoryFilesMD(newRoute);
    if ((0, _utils.isFile)(newRoute) && (0, _utils.checkMD)(newRoute)) pathsMdFiles.push((0, _utils.getPath)(newRoute));
  });
};

var getLinksInFileMd = function getLinksInFileMd(file) {
  return new Promise(function (resolve, reject) {
    _fs["default"].readFile(file, 'utf8', function (err, data) {
      if (data && Array.isArray(data.match(expectMDLink))) {
        var links = data.match(expectMDLink).map(function (v) {
          return v.split('](')[1].slice(0, -1);
        });
        var textLinks = data.match(expectMDLink).map(function (v) {
          return v.split('](')[0].slice(1);
        });
        links.forEach(function (link, i) {
          return filesMDLinks.push({
            id: (0, _utils.createId)(file, i),
            href: link,
            text: textLinks[i],
            file: file
          });
        });
        resolve(filesMDLinks);
      } else reject(err);
    });
  });
};

var linkValidate = function linkValidate(id, url) {
  return new Promise(function (resolve) {
    return (0, _axios["default"])(url).then(function (res) {
      return resolve({
        id: id,
        status: res.status,
        statusText: res.statusText
      });
    })["catch"](function () {
      return resolve({
        id: id,
        status: 404,
        statusText: 'FAIL'
      });
    });
  });
};

var mdLinks = function mdLinks(route, options) {
  return new Promise(function (resolve, reject) {
    if (route) {
      var pathRoute = (0, _utils.getPath)(route);

      if (_fs["default"].existsSync(pathRoute) && !!_fs["default"].lstatSync(pathRoute)) {
        if ((0, _utils.isDirectory)(pathRoute)) getLinksInDirectoryFilesMD(route);
        if ((0, _utils.isFile)(pathRoute) && (0, _utils.checkMD)(pathRoute)) pathsMdFiles.push(pathRoute);
        pathsMdFiles.reverse().forEach(function (file) {
          return filesPromises.push(getLinksInFileMd(file));
        });
        Promise.all(filesPromises).then(function (res) {
          return res[filesPromises.length - 1];
        }).then(function (links) {
          if (Array.isArray(links)) {
            if (!!options && options.validate) {
              links.forEach(function (_ref) {
                var id = _ref.id,
                    href = _ref.href;
                return linkUrlsPromises.push(linkValidate(id, href));
              });
              Promise.all(linkUrlsPromises).then(function (stats) {
                var linksWithStats = links.map(function (link) {
                  return _objectSpread(_objectSpread({}, link), stats.find(function (_ref2) {
                    var id = _ref2.id;
                    return id === link.id;
                  }));
                });
                resolve(linksWithStats);
              })["catch"](function () {
                return reject(new Error("NOT founds links to validate ".concat(route)));
              });
            } else resolve(links);
          } else reject(new Error("".concat(_chalk["default"].bgRgb(211, 246, 18).rgb(228, 13, 222).bold('NOT found md files at'), " ").concat(_chalk["default"].yellow(route))));
        })["catch"](function () {
          return reject(new Error("".concat(_chalk["default"].bgRgb(211, 246, 18).rgb(228, 13, 222).bold('NOT found links'), " ").concat(_chalk["default"].yellow(route))));
        });
      } else reject(new Error(_chalk["default"].bgRgb(211, 246, 18).rgb(228, 13, 222).bold('Path:⚠️  NOT FOUND (check the NAME of DIR \\ FILE or .md)⚠️  )')));
    } else reject(new Error(_chalk["default"].bgRed.yellow.underline.bold('---> The <path> argument is required <---\n')));
  });
}; // mdLinks('lib', { validate: true })
//   .then((res) => console.log('file without validate: ', res))
//   .catch(console.log);


module.exports = {
  mdLinks: mdLinks,
  linkValidate: linkValidate
};