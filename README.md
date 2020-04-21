
![Build Status](https://img.shields.io/badge/nodeJs-100%25-green) ![Coverage Status](https://img.shields.io/badge/coverage-100%25-magenta) ![npm dependents](https://img.shields.io/badge/dependencias-4-pink)
<section align="center">
  <img width="593" height="203"  src="https://storage.googleapis.com/md-links/titleRMC.png">
</section>
<section align="center">
  <img width="1500" height="180" src="https://storage.googleapis.com/md-links/pMD.png">
</section>
<section align="center">
  <img width="972" height="1380" src="https://storage.googleapis.com/md-links/fcFinal.png">
</section>



## INSTALL USING NPM
```bash
npm install yeniferPaloma/md-links
```
<!-- <section align="center">![ttystudio GIF](https://raw.githubusercontent.com/chjj/ttystudio/master/img/example.gif)</section> -->

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
const mdLinks = require("md-links");

mdLinks("./some/example.md")
    .then(links => {
        // => [{ href, text, file }]
    })
    .catch(console.error);

mdLinks("./some/example.md", { validate: true })
    .then(links => {
        // => [{ href, text, file, status, ok }]
    })
    .catch(console.error);

mdLinks("./some/dir")
    .then(links => {
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
