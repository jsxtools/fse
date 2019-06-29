import f from 'fs';
import p from 'path';

const asyncFs = fsFunction => (path, ...args) => new Promise(
	(resolve, reject) => fsFunction(
		path,
		...args,
		(error, ...results) => error
			? reject(error)
		: resolve(...results)
	)
);

const asyncFsMk = fsFunction => (path, ...args) => new Promise(
	(resolve, reject) => {
		// execute the native method
		const exec = () => fsFunction(
			path,
			...args,
			// if there is no parent directory
			error => error && error.code === 'ENOENT'
				// promise to create the parent directory and try again
				? mkdir(p.dirname(path)).then(exec)
			// otherwise, reject errors that are not about an existing directory
			: error && error.code !== 'EEXIST'
				? reject(error)
			// otherwise, resolve
			:  resolve()
		);

		exec()
	}
);

const syncFsMk = fsFunction => (path, ...args) => {
	const exec = () => {
		try {
			// try to execute the native method
			return fsFunction(path, ...args);
		} catch (error) {
			// if there is no parent directory
			if (error && error.code === 'ENOENT') {
				// make the parent directory
				mkdirSync(p.dirname(path));

				// and then try again
				return exec()
			} else if (error && error.code !== 'EEXIST') {
				// otherwise, throw any error not about an existing directory
				throw error;
			}
		}
	};

	return exec();
};

export const access = asyncFs(f.access);
export const accessSync = f.accessSync;
export const appendFile = asyncFs(f.appendFile);
export const appendFileSync = f.appendFileSync;
export const chmod = asyncFs(f.chmod);
export const chmodSync = f.chmodSync;
export const chown = asyncFs(f.chown);
export const chownSync = f.chownSync;
export const close = asyncFs(f.close);
export const closeSync = f.closeSync;
export const exists = asyncFs(f.exists);
export const existsSync = f.existsSync;
export const fchmod = asyncFs(f.fchmod);
export const fchmodSync = f.fchmodSync;
export const fchown = asyncFs(f.fchown);
export const fchownSync = f.fchownSync;
export const fdatasync = asyncFs(f.fdatasync); // ?
export const fdatasyncSync = f.fdatasyncSync;
export const fstat = asyncFs(f.fstat);
export const fstatSync = f.fstatSync;
export const fsync = asyncFs(f.fsync); // ?
export const fsyncSync = f.fsyncSync;
export const ftruncate = asyncFs(f.ftruncate);
export const ftruncateSync = f.ftruncateSync;
export const futimes = asyncFs(f.futimes);
export const futimesSync = f.futimesSync;
export const lchmod = asyncFs(f.lchmod);
export const lchmodSync = f.lchmodSync;
export const lchown = asyncFs(f.lchown);
export const lchownSync = f.lchownSync;
export const link = asyncFs(f.link);
export const linkSync = f.linkSync;
export const lstat = asyncFs(f.lstat);
export const lstatSync = f.lstatSync;
export const mkdtemp = asyncFs(f.mkdtemp);
export const mkdtempSync = f.mkdtempSync;
export const open = asyncFs(f.open);
export const openSync = f.openSync;
export const read = asyncFs(f.read);
export const readSync = f.readSync;
export const readdir = asyncFs(f.readdir);
export const readdirSync = f.readdirSync;
export const readFile = asyncFs(f.readFile);
export const readFileSync = f.readFileSync;
export const readlink = asyncFs(f.readlink);
export const readlinkSync = f.readlinkSync;
export const realpath = asyncFs(f.realpath);
export const realpathSync = f.realpathSync;
export const rename = asyncFs(f.rename);
export const renameSync = f.renameSync;
export const stat = asyncFs(f.stat);
export const statSync = f.statSync;
export const symlink = asyncFs(f.symlink);
export const symlinkSync = f.symlinkSync;
export const truncate = asyncFs(f.truncate);
export const truncateSync = f.truncateSync;
export const unlink = asyncFs(f.unlink);
export const unlinkSync = f.unlinkSync;
export const utimes = asyncFs(f.utimes);
export const utimesSync = f.utimesSync;
export const write = asyncFs(f.write);
export const writeSync = f.writeSync;

export const mkdir = asyncFsMk(f.mkdir);
export const mkdirSync = syncFsMk(f.mkdirSync);
export const writeFile = asyncFsMk(f.writeFile);
export const writeFileSync = syncFsMk(f.writeFileSync);

export const copydir = (source, target) => mkdir(target).then(
	// make the target directory, then promise to read the source directory
	() => readdir(source)
).then(
	// promise to copy the contents of the source directory
	children => Promise.all(
		children.map(
			child => {
				const sourceChild = p.resolve(source, child);
				const targetChild = p.resolve(target, child);

				// promise the appropriate copy of the child
				return lstat(sourceChild).then(
					lstat => lstat.isDirectory()
						? copydir(sourceChild, targetChild)
					: copyFile(sourceChild, targetChild)
				);
			}
		)
	).then(() => {})
);

export const copydirSync = (source, target) => {
	// make the target directory
	mkdirSync(target);

	// read the source directory
	const children = readdirSync(source)

	// copy the contents of the source directory
	children.forEach(
		child => {
			const sourceChild = p.resolve(source, child);
			const targetChild = p.resolve(target, child);

			const lstat = lstatSync(sourceChild);

			// execute the appropriate copy of the child
			if (lstat.isDirectory()) {
				copydirSync(sourceChild, targetChild);
			} else {
				copyFileSync(sourceChild, targetChild);
			}
		}
	);
};

export const copyFile = (source, target) => touchFile(target).then(
	// make the target directory, then promise to copy the file
	() => new Promise(
		(resolve, reject) => {
			// create streams
			const readStream  = createReadStream(p.resolve(source));
			const writeStream = createWriteStream(p.resolve(target));

			// reject on read error
			readStream.on('error', prereject);

			// reject on write error
			writeStream.on('error', prereject);

			// resolve on finish
			writeStream.on('finish', resolve);

			// copy stream
			readStream.pipe(writeStream);

			function prereject (error) {
				// destroy streams
				readStream.destroy();
				writeStream.end();

				// reject with error
				reject(error);
			}
		}
	)
);

export const copyFileSync = (source, target) => {
	// make the target directory
	mkdirSync(p.dirname(target));

	// buffer
	const bufferLength = 64 * 1024;
	const buffer = Buffer.alloc(bufferLength);

	// position
	let bytesRead = 1;
	let position = 0;

	// open the reader and writer
	const reader = f.openSync(source, 'r');
	const writer = f.openSync(target, 'w');

	// copy the file
	while (bytesRead > 0) {
		bytesRead = f.readSync(reader, buffer, 0, bufferLength, position);

		f.writeSync(writer, buffer, 0, bytesRead);

		position += bytesRead;
	}

	// close the reader and writer
	f.closeSync(reader);
	f.closeSync(writer);
};

export const readJson = path => readFile(path, 'utf8').then(JSON.parse);

export const readJsonSync = path => JSON.parse(readFileSync(path, 'utf8'));

export const rmdir = path => new Promise(
	// remove the directory
	(resolve, reject) => f.rmdir(
		path,
		error => {
			// if there is an error about the directory not being empty
			if (error && error.code === 'ENOTEMPTY') {
				// resolve to read the directory
				resolve(readdir(path).then(
					// promise to remove each child of the directory
					children => Promise.all(
						children.map(
							child => {
								const resolvedChild = p.resolve(path, child);

								// promise to remove of the child
								return lstat(resolvedChild).then(
									lstat => lstat.isDirectory()
										? rmdir(resolvedChild)
									: unlink(resolvedChild)
								);
							}
						)
					)
				).then(
					// and then try again
					() => rmdir(path)
				));
			} else if (error) {
				// otherwise, reject any error
				reject(error);
			} else {
				// otherwise, resolve
				resolve();
			}
		}
	)
);

export const rmdirSync = path => {
	try {
		// try to remove the directory
		f.rmdirSync(path);
	} catch (error) {
		// if there is an error about the directory not being empty
		if (error && error.code === 'ENOTEMPTY') {
			const children = readdirSync(path);

			// remove each child of the directory
			children.forEach(
				child => {
					const resolvedChild = p.resolve(path, child);

					const lstat = lstatSync(resolvedChild);

					// remove the child
					if (lstat.isDirectory()) {
						rmdirSync(resolvedChild);
					} else {
						unlinkSync(resolvedChild);
					}
				}
			);

			// and then try again
			rmdirSync(path);
		} else {
			// otherwise, throw any error
			throw error;
		}
	}
};

export const touchFile = path => new Promise(
	// touch the file
	(resolve, reject) => f.open(
		path,
		'wx',
		error => {
			// if there is no parent directory
			if (error && error.code === 'ENOENT') {
				// promise to make the parent directory
				mkdir(p.dirname(path)).then(
					// and then try again
					() => touchFile(path)
				).then(resolve);
			} else if (error && error.code !== 'EEXIST') {
				// otherwise, reject any error not about the directory already existing
				reject(error);
			} else {
				// otherwise, resolve
				resolve();
			}
		}
	)
);

export const touchFileSync = path => {
	try {
		// try to touch the file
		f.openSync(path, 'wx');
	} catch (error) {
		// if there is no parent directory
		if (error && error.code === 'ENOENT') {
			// make the parent directory
			mkdirSync(p.dirname(path));

			// and then try again
			touchFileSync(path);
		} else if (error && error.code !== 'EEXIST') {
			// otherwise, throw any error not about the directory already existing
			throw error;
		}
	}
};

export const createReadStream = f.createReadStream;
export const createWriteStream = f.createWriteStream;
export const unwatchFile = f.unwatchFile;
export const watch = f.watch;
export const watchFile = f.watchFile;

export const Dirent = f.Dirent;
export const FileReadStream = f.FileReadStream;
export const FileWriteStream = f.FileWriteStream;
export const ReadStream = f.ReadStream;
export const Stats = f.Stats;
export const WriteStream = f.WriteStream;

export const constants = f.constants;

export const F_OK = f.F_OK;
export const R_OK = f.R_OK;
export const W_OK = f.W_OK;
export const X_OK = f.X_OK;

/*

// Purposefully non-proxied exports

export const promises = f.promises;
export const _toUnixTimestamp = f._toUnixTimestamp;

*/
