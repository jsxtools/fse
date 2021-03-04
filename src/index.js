import f from 'fs'
import p from 'path'

const asyncFs = fsFunction => (path, ...args) => new Promise(
	(resolve, reject) => fsFunction(
		path,
		...args.slice(0, 1),
		(error, ...results) => error
			? reject(error)
		: resolve(...results)
	)
)

const asyncFsMk = fsFunction => (path, ...args) => new Promise(
	(resolve, reject) => {
		// create options
		let { recursive, mode = 511 } = Object(...args)
		let opts = { recursive, mode }
		let firstPathCreated = undefined

		// execute the native method
		const exec = () => fsFunction(
			path,
			opts,
			// if there is no parent directory
			error => {
				if (error) {
					if (error.code === 'ENOENT') {
						if (recursive) {
							mkdir(p.dirname(path)).then(nextPathCreated => {
								firstPathCreated = firstPathCreated || nextPathCreated

								exec()
							})

							return
						}
					} else if (error.code === 'EEXIST') {
						if (recursive) {
							resolve(firstPathCreated)
							return
						}
					}

					reject(error)

					return
				} else {
					firstPathCreated = recursive ? firstPathCreated : undefined

					resolve(firstPathCreated)
				}
			}
		)

		exec()
	}
)

const syncFsMk = fsFunction => (path, ...args) => {
	// create options
	let { recursive, mode = 511 } = Object(...args)
	let opts = { recursive, mode }
	let firstPathCreated = undefined
	let nextPathCreated = undefined

	const exec = () => {
		try {
			// try to execute the native method
			nextPathCreated = fsFunction(path, opts)

			if (recursive) {
				firstPathCreated = firstPathCreated || nextPathCreated || path
			}
		} catch (error) {
			// if there is no parent directory
			if (error && error.code === 'ENOENT' && recursive) {
				// make the parent directory
				nextPathCreated = mkdirSync(p.dirname(path), { recursive })

				firstPathCreated = firstPathCreated || nextPathCreated

				// and then try again
				exec()
			} else if (error && !(recursive && error.code === 'EEXIST')) {
				// otherwise, throw any error not about an existing directory
				throw error
			}
		}
	}

	exec()

	return firstPathCreated
}

export const access = asyncFs(f.access)
export const accessSync = f.accessSync
export const appendFile = asyncFs(f.appendFile)
export const appendFileSync = f.appendFileSync
export const chmod = asyncFs(f.chmod)
export const chmodSync = f.chmodSync
export const chown = asyncFs(f.chown)
export const chownSync = f.chownSync
export const close = asyncFs(f.close)
export const closeSync = f.closeSync
export const exists = (path) => new Promise(resolve => f.access(path, F_OK, (doesNotExist) => resolve(!doesNotExist)))
export const existsSync = f.existsSync
export const fchmod = asyncFs(f.fchmod)
export const fchmodSync = f.fchmodSync
export const fchown = asyncFs(f.fchown)
export const fchownSync = f.fchownSync
export const fdatasync = asyncFs(f.fdatasync) // ?
export const fdatasyncSync = f.fdatasyncSync
export const fstat = asyncFs(f.fstat)
export const fstatSync = f.fstatSync
export const fsync = asyncFs(f.fsync) // ?
export const fsyncSync = f.fsyncSync
export const ftruncate = asyncFs(f.ftruncate)
export const ftruncateSync = f.ftruncateSync
export const futimes = asyncFs(f.futimes)
export const futimesSync = f.futimesSync
export const lchmod = asyncFs(f.lchmod)
export const lchmodSync = f.lchmodSync
export const lchown = asyncFs(f.lchown)
export const lchownSync = f.lchownSync
export const link = asyncFs(f.link)
export const linkSync = f.linkSync
export const lstat = asyncFs(f.lstat)
export const lstatSync = f.lstatSync
export const mkdtemp = asyncFs(f.mkdtemp)
export const mkdtempSync = f.mkdtempSync
export const open = asyncFs(f.open)
export const openSync = f.openSync
export const read = asyncFs(f.read)
export const readSync = f.readSync
export const readdir = asyncFs(f.readdir)
export const readdirSync = f.readdirSync
export const readFile = asyncFs(f.readFile)
export const readFileSync = f.readFileSync
export const readlink = asyncFs(f.readlink)
export const readlinkSync = f.readlinkSync
export const realpath = asyncFs(f.realpath)
export const realpathSync = f.realpathSync
export const rename = asyncFs(f.rename)
export const renameSync = f.renameSync
export const stat = asyncFs(f.stat)
export const statSync = f.statSync
export const symlink = asyncFs(f.symlink)
export const symlinkSync = f.symlinkSync
export const truncate = asyncFs(f.truncate)
export const truncateSync = f.truncateSync
export const unlink = asyncFs(f.unlink)
export const unlinkSync = f.unlinkSync
export const utimes = asyncFs(f.utimes)
export const utimesSync = f.utimesSync
export const write = asyncFs(f.write)
export const writeSync = f.writeSync

export const mkdir = asyncFsMk(f.mkdir)
export const mkdirSync = syncFsMk(f.mkdirSync)
export const writeFile = asyncFsMk(f.writeFile)
export const writeFileSync = syncFsMk(f.writeFileSync)

export const copydir = (source, target) => mkdir(target, { recursive: true }).then(
	// make the target directory, then promise to read the source directory
	() => readdir(source)
).then(
	// promise to copy the contents of the source directory
	children => Promise.all(
		children.map(
			child => {
				const sourceChild = p.resolve(source, child)
				const targetChild = p.resolve(target, child)

				// promise the appropriate copy of the child
				return lstat(sourceChild).then(
					lstat => lstat.isDirectory()
						? copydir(sourceChild, targetChild)
					: copyFile(sourceChild, targetChild)
				)
			}
		)
	).then(() => {})
)

export const copydirSync = (source, target) => {
	// make the target directory
	mkdirSync(target, { recursive: true })

	// read the source directory
	const children = readdirSync(source)

	// copy the contents of the source directory
	children.forEach(
		child => {
			const sourceChild = p.resolve(source, child)
			const targetChild = p.resolve(target, child)

			const lstat = lstatSync(sourceChild)

			// execute the appropriate copy of the child
			if (lstat.isDirectory()) {
				copydirSync(sourceChild, targetChild)
			} else {
				copyFileSync(sourceChild, targetChild)
			}
		}
	)
}

export const copyFile = (source, target) => touchFile(target, { recursive: true }).then(
	// make the target directory, then promise to copy the file
	() => new Promise(
		(resolve, reject) => {
			// create streams
			const readStream  = createReadStream(p.resolve(source))
			const writeStream = createWriteStream(p.resolve(target))

			// reject on read error
			readStream.on('error', prereject)

			// reject on write error
			writeStream.on('error', prereject)

			// resolve on finish
			writeStream.on('finish', resolve)

			// copy stream
			readStream.pipe(writeStream)

			function prereject (error) {
				// destroy streams
				readStream.destroy()
				writeStream.end()

				// reject with error
				reject(error)
			}
		}
	)
)

export const copyFileSync = (source, target) => {
	const recursive = true

	const copyFileSync = (source, target) => {
		// make the target directory
		mkdirSync(p.dirname(target), { recursive })

		// buffer
		const bufferLength = 64 * 1024
		const buffer = Buffer.alloc(bufferLength)

		// position
		let bytesRead = 1
		let position = 0

		// open the reader and writer
		const reader = f.openSync(source, 'r')
		const writer = f.openSync(target, 'w')

		// copy the file
		while (bytesRead > 0) {
			bytesRead = f.readSync(reader, buffer, 0, bufferLength, position)

			f.writeSync(writer, buffer, 0, bytesRead)

			position += bytesRead
		}

		// close the reader and writer
		f.closeSync(reader)
		f.closeSync(writer)
	}

	copyFileSync(source, target)
}

export const readJson = path => readFile(path, 'utf8').then(JSON.parse)

export const readJsonSync = path => JSON.parse(readFileSync(path, 'utf8'))

export const rmdir = (path, ...args) => {
	let { recursive = false } = Object(...args)

	recursive = Boolean(recursive)

	const rmdir = (path) => new Promise(
		// remove the directory
		(resolve, reject) => f.rmdir(
			path,
			error => {
				// if there is an error about the directory not being empty
				if (error && error.code === 'ENOTEMPTY' && recursive) {
					// resolve to read the directory
					resolve(readdir(path).then(
						// promise to remove each child of the directory
						children => Promise.all(
							children.map(
								child => {
									const resolvedChild = p.resolve(path, child)

									// promise to remove of the child
									return lstat(resolvedChild).then(
										lstat => lstat.isDirectory()
											? rmdir(resolvedChild)
										: unlink(resolvedChild)
									)
								}
							)
						)
					).then(
						// and then try again
						() => rmdir(path)
					))
				} else if (error) {
					// otherwise, reject any error
					reject(error)
				} else {
					// otherwise, resolve
					resolve()
				}
			}
		)
	)

	return rmdir(path)
}

export const rmdirSync = (path, ...args) => {
	let { recursive = false } = Object(...args)

	recursive = Boolean(recursive)

	const rmdirSync = (path) => {
		try {
			// try to remove the directory
			f.rmdirSync(path)
		} catch (error) {
			// if there is an error about the directory not being empty
			if (error && error.code === 'ENOTEMPTY' && recursive) {
				const children = readdirSync(path)

				// remove each child of the directory
				children.forEach(
					child => {
						const resolvedChild = p.resolve(path, child)

						const lstat = lstatSync(resolvedChild)

						// remove the child
						if (lstat.isDirectory()) {
							rmdirSync(resolvedChild)
						} else {
							unlinkSync(resolvedChild)
						}
					}
				)

				// and then try again
				rmdirSync(path)
			} else {
				// otherwise, throw any error
				throw error
			}
		}
	}

	rmdirSync(path)
}

export const touchFile = (path, ...args) => {
	let { recursive = false } = Object(...args)

	recursive = Boolean(recursive)

	const touchFile = (path) => new Promise(
		// touch the file
		(resolve, reject) => f.open(
			path,
			'wx',
			error => {
				// if there is no parent directory
				if (error && error.code === 'ENOENT' && recursive) {
					// promise to make the parent directory
					mkdir(p.dirname(path), { recursive }).then(
						// and then try again
						() => touchFile(path, { recursive })
					).then(resolve)
				} else if (error && error.code !== 'EEXIST') {
					// otherwise, reject any error not about the directory already existing
					reject(error)
				} else {
					// otherwise, resolve
					resolve()
				}
			}
		)
	)

	return touchFile(path)
}

export const touchFileSync = (path, ...args) => {
	let { recursive = false } = Object(...args)

	recursive = Boolean(recursive)

	const touchFileSync = (path) => {
		try {
			// try to touch the file
			f.openSync(path, 'wx')
		} catch (error) {
			// if there is no parent directory
			if (error && error.code === 'ENOENT' && recursive) {
				// make the parent directory
				mkdirSync(p.dirname(path), { recursive })

				// and then try again
				touchFileSync(path)
			} else if (error && error.code !== 'EEXIST') {
				// otherwise, throw any error not about the directory already existing
				throw error
			}
		}
	}

	touchFileSync(path)
}

export const createReadStream = f.createReadStream
export const createWriteStream = f.createWriteStream
export const unwatchFile = f.unwatchFile
export const watch = f.watch
export const watchFile = f.watchFile

export const Dirent = f.Dirent
export const FileReadStream = f.FileReadStream
export const FileWriteStream = f.FileWriteStream
export const ReadStream = f.ReadStream
export const Stats = f.Stats
export const WriteStream = f.WriteStream

export const constants = f.constants

export const F_OK = f.F_OK
export const R_OK = f.R_OK
export const W_OK = f.W_OK
export const X_OK = f.X_OK

/*

// Purposefully non-proxied exports

export const promises = f.promises;
export const _toUnixTimestamp = f._toUnixTimestamp;

*/
