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

[![Npm](https://img.shields.io/badge/npm-v2.0.2-orchid)](https://www.npmjs.com/) [![Npm](https://img.shields.io/twitter/url?color=red&label=Click%20to%20install&logo=npm&logoColor=red&style=plastic&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fyp-.mdlinks%2Fv%2F2.0.1)](https://www.npmjs.com/package/yp-.mdlinks)

## CLI (Command Line Interface) 📦

[![Watch the video](https://storage.googleapis.com/md-links/video.png)](https://youtu.be/kNADJomsQ3o)

- **You can install CLI locally or globally:**

```bash
$ npm install yp-.mdlinks

$ npm install -g yp-.mdlinks
```

- **Now, you can try with this command:**

```bash
$ npx yp-.mdlinks <path-to-file> [options]
```

_For example:_

```bash
$ npx yp-.mdlinks ./some/example.md

./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

## OPTIONS 🔨

##### `-v | --validate`

- **You can pass _validate_ option for check and validate all links in your file or files markdown:**

```bash
$ npx yp-.mdlinks ./some/example.md -v
$ npx yp-.mdlinks ./some/example.md --validate

./some/example.md http://algo.com/2/3/ ok 200 Link to something
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 some file
./some/example.md http://google.com/ ok 301 Google
```

##### `-s | --stats`

- **You can pass _stats_ option for get information about all links in your file or files markdown:**

```bash
$ npx yp-.mdlinks ./some/ -s
$ npx yp-.mdlinks ./some/example.md --stats

Total: 3
Unique: 3
```

##### `-v -s | --validate --stats`

- **You can pass both options and get more information about all links in your file or files markdown:**

```bash
$ npx yp-.mdlinks some -v -s
$ npx yp-.mdlinks some/example.md --validate --stats

Total: 3
Unique: 3
Broken: 1

```

---

## Documentation 💻

```javascript
// ES6
import mdLinks from 'yp-.mdlinks';
// CommonJS
const mdLinks = require('yp-.mdlinks');

mdLinks('src')
  .then((res) => console.log('dir without validate: ', res))
  .catch(console.log);
mdLinks('./src/', { validate: true, stats: true })
  .then((res) => console.log('dir with validate & stats: ', res))
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
mdLinks('assets')
  .then((res) => console.log('dir not exist: ', res))
  .catch(console.log);
mdLinks('index.js')
  .then((res) => console.log('md not correct: ', res))
  .catch(console.log);
mdLinks('reading.md')
  .then((res) => console.log('md file not exist: ', res))
  .catch(console.log);
```

<p align="center">
  <img src="https://media.giphy.com/media/gkKXRebzbN9iBx06nx/giphy.gif">
</p>

---

### Dependencies

> 🔃 Technologies that were used to create this project.

- [x] [Git](https://github.com/yeniferpaloma3773?tab=repositories)
- [x] [Npm](https://docs.npmjs.com/cli-documentation/)
- [x] [Node.js](https://nodejs.org/es/)
- [x] [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript)

---
