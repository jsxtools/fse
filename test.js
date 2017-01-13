const fs = require('.');

Promise.all([
	// test fs.readFile, fs.join
	fs.readFile(
		fs.join(__dirname, 'package.json'),
		'utf-8'
	).then(
		(contents) => JSON.parse(contents)
	).then(
		(pkg) => pkg.name === 'fse'
	),
	// test fs.lstat, fs.mkdir, fs.join, fs.rmdir
	fs.lstat(
		fs.join(__dirname, 'test')
	).then(
		() => Promise.reject(),
		() => fs.mkdir(
			fs.join(__dirname, 'test', 'quick', 'brown', 'fox')
		).then(
			() => fs.lstat(
				fs.join(__dirname, 'test')
			)
		).then(
			() => fs.rmdir(
				fs.join(__dirname, 'test')
			)
		).then(
			() => fs.lstat(
				fs.join(__dirname, 'test')
			).catch(
				(error) => error.code === 'ENOENT'
			)
		)
	)
]).then(
	(results) => results.map(
		(result) => {
			if (!result) {
				throw new Error();
			}
		}
	)
).then(
	() => console.log('Passed') && process.exit(0),
	() => console.log('Failed') && process.exit(1)
)
