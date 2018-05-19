# Changes to fse

### 4.0.1 (November 7, 2017)

- Fixed: Replaced the deprecated `new Buffer()` call with `Buffer.alloc()`
- Fixed: Skip Node v10.1.0 `fs.promises`.

### 4.0.0 (November 7, 2017)

- Changed: `mkdirSync`, `rmdirSync`, `writeFileSync` methods are now recursive
- Added: New `copydirSync`, `copyFileSync`, `readJsonSync`, `touchFileSync`
  methods
- Added: Tests for all new functionality
- Updated: Ensure file exists on `copyFile` method

### 3.0.0 (May 17, 2017)

- Added: Support for Node v4

### 2.0.0 (April 17, 2017)

- Removed: watch task — sticking with plain fs promise-ified
- Removed: path forwarding — sticking with plain fs promise-ified

### 1.0.1 (January 18, 2017)

- Removed: Unnecessary catch in copyFile
- Updated: watch opts now passed into match
- Updated: watch direction method

### 1.0.0 (January 13, 2017)

- Initial version
