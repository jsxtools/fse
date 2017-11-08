# fse [<img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" alt="fse" width="81" height="90" align="right">][fse]

[![NPM Version][npm-img]][npm-url]
[![Unix Status][cli-img]][cli-url]
[![Windows Status][win-img]][win-url]

[fse] is [fs] as promises, extended, and dependency-free. It features;

- Node 4+ compatibility, and;
- improved `fs.mkdir`, `fs.mkdirSync`, `fs.rmdir`, `fs.rmdirSync`,
  `fs.writeFile`, and `fs.writeFileSync` methods allowing recursive
  modification of the file system, and;
- new `fs.copydir`, `fs.copydirSync`, `fs.copyFile`, `fs.copyFileSync`,
  `fs.readJson`, `fs.readJsonSync`, `fs.touchFile`, and `fs.touchFileSync`
  methods.

## New Methods

### fse.copydir

```js
fse.copydir(source, target)
```

- source `<string>` | `<Buffer>` | `<URL>`
- target `<string>` | `<Buffer>` | `<URL>`

Promised copying of the contents of a source directory to a target directory.
`target` may be used to create otherwise non-existent directories.

### fse.copyFile

```js
fse.copyFile(source, target)
```

- source `<string>` | `<Buffer>` | `<integer>` filename or file descriptor
- target `<string>` | `<Buffer>` | `<integer>` filename or file descriptor

Promised copying of a source file to a target file, replacing the target file
if it already exists. `target` may be used to create otherwise non-existent
directories.

### fse.readJson

```js
fse.readJson(path)
```

- path `<string>` | `<Buffer>` | `<integer>` filename or file descriptor

Promised reading of the entire contents of a JSON file, constructing the
JavaScript value or object described by the file. Resolves as the contents of
the file, or rejects with an error.

### fse.touchFile

```js
fse.touchFile(path)
```

- path `<string>` | `<Buffer>` | `<integer>` filename or file descriptor

Promised existence of a file, creating the file if it does not exist. `path`
may be used to create otherwise non-existent directories.

---

All existing [fs methods] are available.

## Licensing

[fse] uses the CC0 “No Rights Reserved” license.

[fs]: https://nodejs.org/api/fs.html
[fs methods]: https://nodejs.org/api/fs.html
[fse]: https://github.com/jonathantneal/fse

[npm-url]: https://www.npmjs.com/package/fse
[npm-img]: https://img.shields.io/npm/v/fse.svg
[cli-url]: https://travis-ci.org/jonathantneal/fse
[cli-img]: https://img.shields.io/travis/jonathantneal/fse.svg
[win-url]: https://ci.appveyor.com/project/jonathantneal/fse
[win-img]: https://img.shields.io/appveyor/ci/jonathantneal/fse.svg
