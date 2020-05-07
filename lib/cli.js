"use strict";

var _index = require("./index");

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Este sera el archivo que contendra la funcion a ejecutarse en el CLI
var linksStats = function linksStats(links, isValidate) {
  var total = links.length;
  var arrHref = links.map(function (_ref) {
    var href = _ref.href;
    return href;
  });

  var unique = _toConsumableArray(new Set(arrHref)).length;

  var failedLinks = isValidate && links.filter(function (_ref2) {
    var statusText = _ref2.statusText;
    return statusText === 'FAIL';
  });
  var broken = Array.isArray(failedLinks) ? failedLinks.length : 0;

  var successMessage = _chalk["default"].green("\u2714 Total : ".concat(total, "\n\u2714 Unique : ").concat(unique));

  console.log(isValidate ? "".concat(successMessage, "\n").concat(_chalk["default"].red("\u2716 Broken : ".concat(broken))) : successMessage);
}; // Definimos una funcion principal que ejecutara mdLinks


var cli = function cli(path, options) {
  if (path) {
    (0, _index.mdLinks)(path, options).then(function (links) {
      if (Array.isArray(links) && !!options && options.validate) {
        if (options.stats) linksStats(links, true);else links.forEach(function (_ref3) {
          var file = _ref3.file,
              href = _ref3.href,
              status = _ref3.status,
              statusText = _ref3.statusText,
              text = _ref3.text;
          console.log("".concat(_chalk["default"].yellow(file), " ").concat(_chalk["default"].cyan(href), " ").concat(_chalk["default"].magenta(statusText), " ").concat(_chalk["default"].magenta(status), " ").concat(_chalk["default"].blue(text)));
        });
      } else if (Array.isArray(links) && !!options && options.stats) linksStats(links);else links.forEach(function (_ref4) {
        var file = _ref4.file,
            href = _ref4.href,
            text = _ref4.text;
        return console.log("\u2A2D ".concat(_chalk["default"].yellow.underline(file), " \uD83E\uDC72 ").concat(_chalk["default"].cyanBright(href), "...").concat(_chalk["default"].blue(text)));
      });
    })["catch"](function () {
      return console.log("\n".concat(_chalk["default"].rgb(227, 13, 219).bold('---> PLEASE CHECK THE PATH (is wrong or there`rnt links into .md)-->'), " ").concat(_chalk["default"].bgRgb(227, 13, 219).yellow.bold(path), "\n "));
    });
  } else {
    // Si el usuario no pasa ningun path le saldra este aviso, con informacin sobre como debe ejecutar el comando CLI
    console.error("\n".concat(_chalk["default"].bgYellow.rgb(112, 19, 147).bold('🡲  Please specify the path:  ')));
    console.log("  ".concat(_chalk["default"].cyan('yp-.mdlinks'), " ").concat(_chalk["default"].yellow.bold('<path>'), "\n"));
    console.log("\n".concat(_chalk["default"].bgYellow.rgb(112, 19, 147).bold('🡲  For example:  ')));
    console.log("  ".concat(_chalk["default"].cyan('yp-.mdlinks'), " ").concat(_chalk["default"].yellow.bold('md_directory')));
    console.log("  ".concat(_chalk["default"].cyan('yp-.mdlinks'), " ").concat(_chalk["default"].yellow.bold('README.md'), "\n"));
    console.log("".concat(_chalk["default"].bgYellow.rgb(112, 19, 147).bold('🡲  Run  ')).concat(_chalk["default"].cyan("\n".concat('  yp-.mdlinks', " --help")), " ").concat(_chalk["default"].yellow.bold('for info '), "\n"));
  }
}; // cli('test', { stats: false, validate: false });


module.exports = cli;