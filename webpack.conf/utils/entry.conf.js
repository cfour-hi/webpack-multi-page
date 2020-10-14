const path = require('path');
const fs = require('fs');

function resolveSubDirname(filepath) {
  return fs
    .readdirSync(filepath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name);
}

const dirPages = path.resolve(__dirname, '../../pages');
const pages = resolveSubDirname(dirPages);
const ENTRY_NAME = 'index';
const entries = [
  {
    entryName: ENTRY_NAME,
    entry: path.resolve(dirPages, `${ENTRY_NAME}.js`),
    filename: `${ENTRY_NAME}.html`,
    template: path.resolve(dirPages, `${ENTRY_NAME}.html`),
  },
];

function processEntry(name) {
  const pagePath = path.resolve(dirPages, name);
  const filename = `${name}/${ENTRY_NAME}.html`;

  entries.push({
    filename,
    entryName: `${name}/${ENTRY_NAME}`,
    entry: path.resolve(dirPages, name, `${ENTRY_NAME}.js`),
    template: path.resolve(dirPages, filename),
  });

  const subDirs = resolveSubDirname(pagePath).map(
    (dirname) => `${name}/${dirname}`,
  );
  if (subDirs.length) {
    subDirs.forEach(processEntry);
  }
}

pages.forEach(processEntry);

module.exports = entries;
