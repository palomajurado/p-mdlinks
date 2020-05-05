[![Node version](https://img.shields.io/badge/node-v13.1.0-green)](https://nodejs.org/es/) ![Coverage Status](https://img.shields.io/badge/coverage-100%25-magenta) ![npm dependents](https://img.shields.io/badge/dependencies-4-pink)

<p align="center">
  <img src="https://storage.googleapis.com/md-links/titleRMC.png">
</p>
<p align="center">
  <img src="https://storage.googleapis.com/md-links/pMD.png">
</p>
<p align="center">
  <img src="https://storage.googleapis.com/md-links/fcFinal%20(3).png">
</p>

---

[![Npm](https://img.shields.io/badge/npm-v6.12.1-orchid)](https://www.npmjs.com/)

## CLI (Command Line Interface - Interfaz de Línea de Comando)

<!-- <p align="center">![ttystudio GIF](https://raw.githubusercontent.com/chjj/ttystudio/master/img/example.gif)</p> -->

You can install CLI locally or globally:

```bash
$ npm install yp-md-links

$ npm install -g yp-md-links
```

Now, you can try whith this command:

```bash
$ npx yp-md-links <path-to-file> [options]
```

For example:

```bash
$ npx yp-md-links ./some/example.md

./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

#### OPTIONS

##### `-v | --validate`

You can pass _validate_ option for check and validate all links in your file or files markdown:

```bash
$ npx yp-md-links ./some/example.md -v
$ npx yp-md-links ./some/example.md --validate

./some/example.md http://algo.com/2/3/ ok 200 Link to something
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 some file
./some/example.md http://google.com/ ok 301 Google
```

##### `-s | --stats`

You can pass _stats_ option for get information about all links in your file or files markdown:

```bash
$ npx yp-md-links ./some/ -s
$ npx yp-md-links ./some/example.md --stats

Total: 3
Unique: 3
```

##### `-v -s | --validate --stats`

You can pass both option and get more information about all links in your file or files markdown:

```bash
$ npx yp-md-links some -v -s
$ npx yp-md-links some/example.md --validate --stats

Total: 3
Unique: 3
Broken: 1
```

<!-- ![ttystudio GIF](https://raw.githubusercontent.com/chjj/ttystudio/master/img/example.gif) -->

---

## Documentation

```javascript
// ES6
import mdLinks from 'yp-md-links';
// CommonJS
const mdLinks = require('yp-md-links');

mdLinks('src')
  .then((res) => console.log('dir without validate: ', res))
  .catch(console.log);
mdLinks('./src/', { validate: true, stats: true })
  .then((res) => console.log('dir with validate: ', res))
  .catch(console.log);
mdLinks('README.md')
  .then((res) => console.log('file without validate: ', res))
  .catch(console.log);
mdLinks('README.md', { validate: true })
  .then((res) => console.log('file with validate: ', res))
  .catch(console.log);
mdLinks('README.md', { stats: true })
  .then((res) => console.log('file with stats: ', res))
  .catch(console.log);
mdLinks('pepe1')
  .then((res) => console.log('dir false: ', res))
  .catch(console.log);
mdLinks('read.js')
  .then((res) => console.log('js file false: ', res))
  .catch(console.log);
mdLinks('read.md')
  .then((res) => console.log('md file false: ', res))
  .catch(console.log);
```

### Dependencies

Technologies that were used to create this project.

- [x] [Git](https://github.com/yeniferPaloma?tab=repositories)
- [x] [Npm](https://docs.npmjs.com/cli-documentation/)
- [x] [Node.js](https://nodejs.org/es/)
- [x] [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript)

---
