const mdLinks = require('../lib/index');

describe('mdLinks: return the links of a file .md', () => {
  it('Obtained links from file .md', (done) => {
    try {
      expect(mdLinks('test/example.md')).resolves.toStrictEqual([
        {
          id: 'example-1',
          href: 'https://github.com/yeniferPaloma?tab=repositories',
          text: 'Git',
          file:
            'C:\\Users\\Pc\\Desktop\\markDown\\LIM012-fe-md-links\\test\\example.md',
        },
        {
          id: 'example-2',
          href: 'https://docs.npmjs.com/cli-documentation/',
          text: 'Npm',
          file:
            'C:\\Users\\Pc\\Desktop\\markDown\\LIM012-fe-md-links\\test\\example.md',
        },
        {
          id: 'example-3',
          href: 'https://nodejs.org/es/',
          text: 'Node.js',
          file:
            'C:\\Users\\Pc\\Desktop\\markDown\\LIM012-fe-md-links\\test\\example.md',
        },
        {
          id: 'example-4',
          href: 'https://developer.mozijuanitolla.org/es/docs/Web/JavaScript',
          text: 'Javascript',
          file:
            'C:\\Users\\Pc\\Desktop\\markDown\\LIM012-fe-md-links\\test\\example.md',
        },
      ]);
      done();
    } catch (error) {
      done(error);
    }
  });
});
