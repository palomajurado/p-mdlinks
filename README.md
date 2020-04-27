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

[![Npm](https://img.shields.io/badge/npm-v6.12.1-orchid)](https://www.npmjs.com/)

## INSTALL USING NPM

```bash
npm install yeniferPaloma/md-links
```

<!-- <p align="center">![ttystudio GIF](https://raw.githubusercontent.com/chjj/ttystudio/master/img/example.gif)</p> -->

---

## CLI to execute at terminal

```bash
md-links ./directory

md-links ./directory --validate

md-links ./directory --stats

md-links ./directory --validate --stats
```

<!-- ![ttystudio GIF](https://raw.githubusercontent.com/chjj/ttystudio/master/img/example.gif) -->

---

## Documentation

```javascript
const mdLinks = require('md-links');

mdLinks('./some/example.md')
  .then((links) => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks('./some/example.md', { validate: true })
  .then((links) => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks('./some/dir')
  .then((links) => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### Dependencies

Technologies that were used to create this project.

- [x] [Git](https://github.com/yeniferPaloma?tab=repositories)
- [x] [Npm](https://docs.npmjs.com/cli-documentation/)
- [x] [Node.js](https://nodejs.org/es/)
- [x] [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript)

---
