const mdLinks = require('./lib/index');

// Ya que todo lo tenemos en carpetas se necesita un archivo index.js en el root del proyecto para que el usuario al instalar la libreria
// pueda importar esta funcion sin problema. Igualmente defini una configuracion 'files' en el package.json para que solo se publiquen en npm
// los archivos del root y la carpeta dist con los archivos transpilados y asi el usuario no tenga acceso al codigo base de la carpeta 'src'
module.exports = mdLinks;
