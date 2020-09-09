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

[![npm](https://img.shields.io/npm/v/p-mdlinks?color=rgb%28241%2C%2082%2C%200%29&label=Click%20to%20install&logo=npm&logoColor=rgb%28241%2C%2082%2C%200%29&style=plastic)](https://www.npmjs.com/package/p-mdlinks) [![Github developer](https://img.shields.io/twitter/url?color=rgb%28114%2C%20248%2C%2097%29&label=Paloma&logo=github&logoColor=rgb%28114%2C%20248%2C%2097%29&style=plastic&url=https%3A%2F%2Fgithub.com%2Fyeniferpaloma3773%3Ftab%3Drepositories)](https://github.com/yeniferpaloma3773?tab=repositories)
[![Yutube DEMOS](https://img.shields.io/twitter/url?color=rgb%28255%2C%200%2C%200%29&label=Demos&logo=youtube&logoColor=rgb%28255%2C%200%2C%200%29&style=plastic&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DwRivvzrZXic)](https://www.youtube.com/watch?v=wRivvzrZXic)

## CLI (Command Line Interface) 📦

[![Watch the video](https://storage.googleapis.com/md-links/video11.png)](https://youtu.be/kNADJomsQ3o)

- **Install the _CLI_ locally or globally:**

```bash
$ npm install -g palomajurado/p-mdlinks

$ npm install @palomania/mdlinks

$ npm install p-mdlinks

$ npm install -g p-mdlinks
```

- **Now, get _markdowns links_ with this command:**

```bash
$ npx p-mdlinks <path-to-file> [options]
```

_For example:_

```bash
$ npx p-mdlinks ./some/example.md

./some/example.md http://ubu.com/2/3/ Link to something
./some/example.md https://deco.net/algun-doc.html some file
./some/example.md http://google.com/ Google
```

## OPTIONS 🔨

##### `-v | --validate`

- **Pass _validate_ option to check & validate all markdown's link(s):**

```bash
$ npx p-mdlinks ./some/example.md -v
$ npx p-mdlinks ./some/example.md --validate

./some/example.md http://ubu.com/2/3/ ok 200 Link to something
./some/example.md https://deco.net/algun-doc.html fail 404 some file
./some/example.md http://google.com/ ok 301 Google
```

##### `-s | --stats`

- **Pass _stats_ option to get the total & unique(s) of markdown's link(s):**

```bash
$ npx p-mdlinks ./some/ -s
$ npx p-mdlinks ./some/example.md --stats

Total: 3
Unique: 3
```

##### `-v -s | --validate --stats`

- **You can pass _both_ options for totals & link's status:**

```bash
$ npx p-mdlinks some -v -s
$ npx p-mdlinks some/example.md --validate --stats

Total: 3
Unique: 3
Broken: 1

```

---

## JavaScript API 💻

[![Watch the video](https://storage.googleapis.com/md-links/video22.png)](https://youtu.be/wRivvzrZXic)

### 🔗 Documentation

- **_Import_ or _require_ 'p-mdlinks' to handle markdown link(s) as objects, validate & stats them also**

```javascript
// ES6
import mdLinks from 'p-mdlinks';
// CommonJS
const mdLinks = require('p-mdlinks');

mdLinks('src')
  .then((res) => console.log('dir without validate: ', res))
  .catch(console.log);
mdLinks('./src', { validate: true })
  .then((res) => console.log('dir with validate: ', res))
  .catch(console.log);
mdLinks('README.md')
  .then((res) => console.log('file without validate: ', res))
  .catch(console.log);
mdLinks('./README.md', { validate: true })
  .then((res) => console.log('file with validate: ', res))
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

### 🔗 Dependencies

> Technologies used to create this project.

- [x] [Git](https://github.com/yeniferpaloma3773?tab=repositories)
- [x] [Npm](https://docs.npmjs.com/cli-documentation/)
- [x] [Node.js](https://nodejs.org/es/)
- [x] [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript)

---
