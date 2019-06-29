// tooling
const fs   = require('.');
const path = require('path');

// tests
Promise.all([
	// test fs.readFile
	fs.readFile(path.join(__dirname, 'package.json'), 'utf-8').then(JSON.parse).then(
		pkg => pkg.name === 'fse'
	),

	// test fs.readJson
	fs.readJson(path.join(__dirname, 'package.json')).then(
		pkg => pkg.name === 'fse' ? Promise.resolve(true) : Promise.reject()
	),

	// test fs.readJsonSync
	new Promise(
		(resolve, reject) => {
			try {
				const pkg = fs.readJsonSync(path.join(__dirname, 'package.json'));

				return pkg.name === 'fse' ? resolve(true) : reject();
			} catch (err) {
				return reject(err);
			}
		}
	),

	// test fs.lstat, fs.mkdir, fs.rmdir
	fs.lstat(path.join(__dirname, 'test-dir')).then(
		() => Promise.reject(),
		() => Promise.resolve(true)
	).then(
		() => fs.mkdir(path.join(__dirname, 'test-dir', 'quick', 'brown', 'fox'))
	).then(
		() => fs.lstat(path.join(__dirname, 'test-dir', 'quick', 'brown', 'fox'))
	).then(
		() => fs.rmdir(path.join(__dirname, 'test-dir'))
	).then(
		() => fs.lstat(path.join(__dirname, 'test-dir')).catch(
			err => err.code === 'ENOENT' ? Promise.resolve(true) : Promise.reject()
		)
	),

	// test fs.lstatSync, fs.mkdirSync, fs.rmdirSync
	new Promise(
		(resolve, reject) => {
			try {
				fs.lstatSync(path.join(__dirname, 'test-dir-sync'));

				return reject();
			} catch (err) {
				// continue without error
			}

			fs.mkdirSync(path.join(__dirname, 'test-dir-sync', 'quick', 'brown', 'fox'));
			fs.lstatSync(path.join(__dirname, 'test-dir-sync', 'quick', 'brown', 'fox'));
			fs.rmdirSync(path.join(__dirname, 'test-dir-sync'));

			try {
				fs.lstatSync(path.join(__dirname, 'test-dir-sync'));

				return reject();
			} catch (err) {
				if (err.code !== 'ENOENT') {
					return reject();
				}
			}

			return resolve(true);
		}
	),

	// test fs.lstat, fs.touchFile, fs.copyFile, fs.unlink, fs.rmdir
	fs.lstat(path.join(__dirname, 'test-file')).then(
		() => Promise.reject(),
		() => Promise.resolve(true)
	).then(
		() => fs.lstat(path.join(__dirname, 'test-file', 'quick', 'brown', 'fox.file'))
	).then(
		() => Promise.reject(),
		() => Promise.resolve(true)
	).then(
		() => fs.touchFile(path.join(__dirname, 'test-file', 'quick', 'brown', 'fox.file'))
	).then(
		() => fs.copyFile(path.join(__dirname, 'test-file', 'quick', 'brown', 'fox.file'), path.join(__dirname, 'test-file', 'quick', 'brown', 'fox.copy'))
	).then(
		() => fs.copydir(path.join(__dirname, 'test-file', 'quick', 'brown'), path.join(__dirname, 'test-file', 'quick', 'beige'))
	).then(
		() => fs.lstat(path.join(__dirname, 'test-file', 'quick', 'beige'))
	).then(
		() => fs.unlink(path.join(__dirname, 'test-file', 'quick', 'brown', 'fox.copy'))
	).then(
		() => fs.lstat(path.join(__dirname, 'test-file', 'quick', 'brown', 'fox.copy')).catch(
			err => err.code === 'ENOENT'
		)
	).then(
		() => fs.rmdir(path.join(__dirname, 'test-file'))
	).then(
		() => fs.lstat(path.join(__dirname, 'test-file')).catch(
			err => err.code === 'ENOENT'
		)
	),

	// test fs.lstatSync, fs.touchFileSync, fs.copyFileSync, fs.copydir, fs.unlinkSync, fs.rmdirSync
	new Promise(
		(resolve, reject) => {
			try {
				fs.lstatSync(path.join(__dirname, 'test-file-sync'));

				return reject();
			} catch (err) {
				// continue without error
			}

			try {
				fs.lstatSync(path.join(__dirname, 'test-file-sync', 'quick', 'brown', 'fox.file'));

				return reject();
			} catch (err) {
				// continue without error
			}

			fs.touchFileSync(path.join(__dirname, 'test-file-sync', 'quick', 'brown', 'fox.file'));
			fs.copyFileSync(path.join(__dirname, 'test-file-sync', 'quick', 'brown', 'fox.file'), path.join(__dirname, 'test-file-sync', 'quick', 'brown', 'fox.copy'));
			fs.copydirSync(path.join(__dirname, 'test-file-sync', 'quick', 'brown'), path.join(__dirname, 'test-file-sync', 'quick', 'beige'));
			fs.lstatSync(path.join(__dirname, 'test-file-sync', 'quick', 'beige', 'fox.copy'));
			fs.unlinkSync(path.join(__dirname, 'test-file-sync', 'quick', 'brown', 'fox.copy'));

			try {
				fs.lstatSync(path.join(__dirname, 'test-file-sync', 'quick', 'brown', 'fox.copy'));
			} catch (err) {
				if (err.code !== 'ENOENT') {
					return reject(err);
				}
			}

			fs.rmdirSync(path.join(__dirname, 'test-file-sync'));

			try {
				fs.lstatSync(path.join(__dirname, 'test-file-sync'));
			} catch (err) {
				if (err.code !== 'ENOENT') {
					return reject(err);
				}
			}

			return resolve(true);
		}
	)
]).then(
	results => results.map(
		result => {
			if (!result) {
				throw new Error();
			}
		}
	)
).then(
	() => console.log('Passed') && process.exit(0),
	() => console.log('Failed') && process.exit(1)
);
