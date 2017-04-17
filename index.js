// tooling
const fs   = require('fs');
const path = require('path');

// exports extended
Object.assign(
	exports,
	// fs
	fs,
	// fs then-ified
	...[
		'access',
		'appendFile',
		'chmod',
		'chown',
		'close',
		'exists',
		'fchmod',
		'fchown',
		'fdatasync',
		'fstat',
		'fsync',
		'ftruncate',
		'futimes',
		'lchmod',
		'lchown',
		'link',
		'lstat',
		'mkdtemp',
		'open',
		'read',
		'readdir',
		'readFile',
		'readlink',
		'realpath',
		'rename',
		'rmdir',
		'stat',
		'symlink',
		'truncate',
		'unlink',
		'utimes',
		'write',
		'write'
	].map(
		(name) => ({
			[name]: (pathname, ...args) => new Promise(
				(resolve, reject) => fs[name](
					pathname,
					...args,
					(error, data) => error ? reject(error) : resolve(data)
				)
			)
		})
	),
	// mkdir / writeFile, then-ified and mkdir-ified
	...['mkdir', 'writeFile'].map(
		(key) => ({
			[key]: (pathname, ...args) => new Promise(
				(resolve, reject) => fs[key](
					pathname,
					...args,
					(error, data) => (
						// if there is no parent directory
						error && error.code === 'ENOENT'
						// resolve with a promise to make the parent directory
						? resolve(
							exports.mkdir(
								path.dirname(pathname)
							).then(
								// and then try again
								() => exports[key](pathname, ...args)
							)
						)
						// otherwise
						: (
							// if there is an error not about the directory already existing
							error && error.code !== 'EEXIST'
							// reject with the error
							? reject(error)
							// otherwise, resolve
							: resolve(data)
						)
					)
				)
			)
		})
	),
	// copydir, then-ified
	{
		copydir: (source, target) => exports.mkdir(target).then(
			// make the target directory, then read the source directory
			(...result) => exports.readdir(source).then(
				// promise all copied children
				(children) => Promise.all(
					children.map(
						// resolved children
						(child) => [
							path.resolve(source, child),
							path.resolve(target, child)
						]
					).map(
						// direct child to appropriate action
						([sourceChild, targetChild]) => exports.lstat(sourceChild).then(
							(stat) => stat.isDirectory()
							? exports.copydir(sourceChild, targetChild)
							: exports.copyFile(sourceChild, targetChild)
						)
					)
				).then(
					() => Promise.resolve(...result)
				)
			)
		)
	},
	// copyFile, then-ified
	{
		copyFile: (source, target) => new Promise(
			(resolve, reject) => {
				// create streams
				const readStream  = exports.createReadStream(source);
				const writeStream = exports.createWriteStream(target);

				// reject on read error
				readStream.on('error', prereject);

				// reject on write error
				writeStream.on('error', prereject);

				// resolve on finish
				writeStream.on('finish', resolve);

				// copy stream
				readStream.pipe(writeStream);

				function prereject(error) {
					// destroy streams
					readStream.destroy();
					writeStream.end();

					// reject with error
					reject(error);
				}
			}
		)
	},
	// rmdir, then-ified
	{
		rmdir: (pathname, ...args) => new Promise(
			// remove the directory
			(resolve, reject) => fs.rmdir(
				pathname,
				...args,
				(error, ...result) => error
				? error.code === 'ENOTEMPTY'
				// if the error is about a non-empty directory
				? resolve(
					exports.readdir(pathname).then(
						// promise for each child of the current pathname
						(children) => Promise.all(
							children.map(
								// resolved child
								(child) => path.resolve(pathname, child)
							).map(
								(resolvedChild) => exports.lstat(resolvedChild).then(
									(stat) => stat.isDirectory()
									// if child is a directory, remove it
									? exports.rmdir(resolvedChild, ...args)
									// otherwise, delete it from the file system
									: exports.unlink(resolvedChild)
								)
							)
						)
					).then(
						// afterward, attempt to delete the directory again
						() => exports.rmdir(pathname, ...args)
					)
				)
				// otherwise, reject the error
				: reject(error)
				// otherwise, resolve with the result
				: resolve(...result)
			)
		)
	},
	// touchFile, then-ified
	{
		touchFile: (filename) => new Promise(
			// promise touched file
			(resolve, reject) => fs.open(
				filename,
				'wx',
				(error, data) => (
					// if there is no parent directory
					error && error.code === 'ENOENT'
					// resolve with a promise to make the parent directory
					? resolve(
						exports.mkdir(
							path.dirname(filename)
						).then(
							// and then try again
							() => exports.touchFile(filename)
						)
					)
					// otherwise
					: (
						// if there is an error not about the directory already existing
						error && error.code !== 'EEXIST'
						// reject with the error
						? reject(error)
						// otherwise, resolve
						: resolve(data)
					)
				)
			)
		)
	}
);
