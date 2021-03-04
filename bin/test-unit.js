const fs = require('fs')
const path = require('path')

const expect = require('./internal/expect.js')
const fse = require('..')

async function unit() {
	rmfile('to-copy', 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2', 'test-file')
	rmdir('to-copy', 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('to-copy', 'test-dir-deep-1-of-2')
	rmdir('to-copy')

	rmfile('is-copy', 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2', 'test-file')
	rmdir('is-copy', 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('is-copy', 'test-dir-deep-1-of-2')
	rmdir('is-copy')

	rmfile('test-dir-deep-1-of-2', 'test-dir-deep-2-of-2', 'test-file')
	rmdir('test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('test-dir-deep-1-of-2')

	rmfile('test-file')
	rmdir('test-dir')

	await test('fse.readFile()', async () => {
		const pathToPackageJson = path.join(__dirname, 'package.json')

		const resulted = await fse.readFile(pathToPackageJson, 'utf-8')
		const expected = '{\n  "type": "commonjs",\n  "private": true\n}\n'

		expect(resulted).toBe(expected)
	})

	await test('fse.readJson()', async () => {
		const pathToPkg = path.join(__dirname, 'package.json')

		const resulted = await fse.readJson(pathToPkg, 'utf-8')
		const expected = { type: 'commonjs', private: true }

		expect(resulted).toEqual(expected)
	})

	await test('fse.readFileSync()', () => {
		const pathToPackageJson = path.join(__dirname, 'package.json')

		const resulted = fse.readFileSync(pathToPackageJson, 'utf-8')
		const expected = '{\n  "type": "commonjs",\n  "private": true\n}\n'

		expect(resulted).toBe(expected)
	})

	await test('fse.readJsonSync()', () => {
		const pathToPkg = path.join(__dirname, 'package.json')

		const resulted = fse.readJsonSync(pathToPkg, 'utf-8')
		const expected = { type: 'commonjs', private: true }

		expect(resulted).toEqual(expected)
	})

	await test('fse.touchFile()', async () => {
		const pathToNil = path.join(__dirname, 'test-file')

		const resulted = await fse.touchFile(pathToNil)
		const expected = undefined

		expect(pathToNil).toExist()
		expect(resulted).toEqual(expected)
	})

	rmfile('test-file')

	await test('fse.touchFile() (deep throws)', async () => {
		let resulted

		const pathToNil = path.join(__dirname, 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2', 'test-file')

		await expect(async () => {
			resulted = await fse.touchFile(pathToNil)
		}).toThrow()

		expect(pathToNil).toNotExist()
		expect(resulted).toEqual(undefined)
	})

	await test('fse.touchFile() (deep recursive)', async () => {
		let resulted

		const pathToNil = path.join(__dirname, 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2', 'test-file')

		await expect(async () => {
			resulted = await fse.touchFile(pathToNil, { recursive: true })
		}).toNotThrow()

		expect(pathToNil).toExist()
		expect(resulted).toEqual(undefined)
	})

	rmfile('test-dir-deep-1-of-2', 'test-dir-deep-2-of-2', 'test-file')
	rmdir('test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('test-dir-deep-1-of-2')

	await test('fse.touchFileSync()', () => {
		const pathToNil = path.join(__dirname, 'test-file')

		const resulted = fse.touchFileSync(pathToNil)
		const expected = undefined

		expect(pathToNil).toExist()
		expect(resulted).toEqual(expected)
	})

	rmfile('test-file')

	await test('fse.exists()', async () => {
		const pathToNil = path.join(__dirname, 'test-file')

		const result01 = await fse.exists(pathToNil)

		expect(pathToNil).toNotExist()
		expect(result01).toEqual(false)

		await fse.touchFile(pathToNil, 'utf-8')

		const result02 = await fse.exists(pathToNil)

		expect(pathToNil).toExist()
		expect(result02).toEqual(true)
	})

	rmfile('test-file')

	await test('fse.existsSync()', () => {
		const pathToNil = path.join(__dirname, 'test-file')

		const result01 = fse.existsSync(pathToNil)

		expect(pathToNil).toNotExist()
		expect(result01).toEqual(false)

		fse.touchFileSync(pathToNil, 'utf-8')

		const result02 = fse.existsSync(pathToNil)

		expect(pathToNil).toExist()
		expect(result02).toEqual(true)
	})

	rmfile('test-file')

	await test('fse.access()', async () => {
		const pathToNil = path.join(__dirname, 'test-file')

		let result01
		let result02

		await expect(async () => {
			result01 = await fse.access(pathToNil)
		}).toThrow()

		expect(pathToNil).toNotExist()
		expect(result01).toEqual(undefined)

		await fse.touchFile(pathToNil, 'utf-8')

		await expect(async () => {
			result02 = await fse.access(pathToNil)
		}).toNotThrow()

		expect(pathToNil).toExist()
		expect(result02).toEqual(undefined)
	})

	rmfile('test-file')

	await test('fse.accessSync()', () => {
		const pathToNil = path.join(__dirname, 'test-file')

		let result01
		let result02

		expect(() => {
			result01 = fse.accessSync(pathToNil)
		}).toThrow()

		expect(pathToNil).toNotExist()
		expect(result01).toEqual(undefined)

		fse.touchFileSync(pathToNil, 'utf-8')

		expect(() => {
			result02 = fse.accessSync(pathToNil)
		}).toNotThrow()

		expect(pathToNil).toExist()
		expect(result02).toEqual(undefined)
	})

	rmfile('test-file')

	await test('fse.mkdir()', async () => {
		const pathToDir = path.join(__dirname, 'test-dir')

		const resulted = await fse.mkdir(pathToDir)
		const expected = undefined

		expect(pathToDir).toExist()
		expect(resulted).toBe(expected)
	})

	rmdir('test-dir')

	await test('fse.mkdir() (exists throws)', async () => {
		const pathToDir = path.join(__dirname, 'test-dir')

		let resulted = undefined
		let expected = undefined

		fs.mkdirSync(pathToDir)

		await expect(async () => {
			resulted = await fse.mkdir(pathToDir)
		}).toThrow()

		expect(pathToDir).toExist()
		expect(resulted).toBe(expected)
	})

	rmdir('test-dir')

	await test('fse.mkdir() (exists recursive)', async () => {
		const pathToDir = path.join(__dirname, 'test-dir')

		let resulted = undefined
		let expected = undefined

		fs.mkdirSync(pathToDir)

		await expect(async () => {
			resulted = await fse.mkdir(pathToDir, { recursive: true })
		}).toNotThrow()

		expect(pathToDir).toExist()
		expect(resulted).toBe(expected)
	})

	rmdir('test-dir')

	await test('fse.mkdir() (deep throws)', async () => {
		const pathToDir = path.join(__dirname, 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')

		let resulted = undefined
		let expected = undefined

		await expect(async () => {
			resulted = await fse.mkdir(pathToDir)
		}).toThrow()

		expect(pathToDir).toNotExist()
		expect(resulted).toBe(expected)
	})

	rmdir('test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('test-dir-deep-1-of-2')

	await test('fse.mkdir() (deep recursive)', async () => {
		const pathToDir = path.join(__dirname, 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')

		let resulted = undefined
		let expected = undefined

		await expect(async () => {
			resulted = await fse.mkdir(pathToDir, { recursive: true })
		}).toNotThrow()

		expect(pathToDir).toExist()
		expect(resulted).toBe(expected)
	})

	rmdir('test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('test-dir-deep-1-of-2')

	await test('fse.mkdirSync()', () => {
		const pathToDir = path.join(__dirname, 'test-dir')

		const resulted = fse.mkdirSync(pathToDir)
		const expected = undefined

		expect(resulted).toBe(expected)
		expect(pathToDir).toExist()
	})

	rmdir('test-dir')

	await test('fse.mkdirSync() (exists throws)', () => {
		const pathToDir = path.join(__dirname, 'test-dir')

		let resulted = undefined
		let expected = undefined

		fs.mkdirSync(pathToDir)

		expect(() => {
			resulted = fse.mkdirSync(pathToDir)
		}).toThrow()

		expect(pathToDir).toExist()
		expect(resulted).toBe(expected)
	})

	rmdir('test-dir')

	await test('fse.mkdirSync() (exists recursive)', () => {
		const pathToDir = path.join(__dirname, 'test-dir')

		let resulted = undefined
		let expected = pathToDir

		expect(() => {
			resulted = fse.mkdirSync(pathToDir, { recursive: true })
		}).toNotThrow()

		expect(pathToDir).toExist()
		expect(resulted).toBe(expected)
	})

	rmdir('test-dir')

	await test('fse.mkdirSync() (deep throws)', () => {
		const pathToDir = path.join(__dirname, 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')

		let resulted = undefined
		let expected = undefined

		expect(() => {
			resulted = fse.mkdirSync(pathToDir)
		}).toThrow()

		expect(pathToDir).toNotExist()
		expect(resulted).toBe(expected)
	})

	rmdir('test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('test-dir-deep-1-of-2')

	await test('fse.mkdirSync() (deep recursive)', () => {
		const pathToDir = path.join(__dirname, 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')

		let resulted = undefined
		let expected = path.join(__dirname, 'test-dir-deep-1-of-2')

		expect(() => {
			resulted = fse.mkdirSync(pathToDir, { recursive: true })
		}).toNotThrow()

		expect(pathToDir).toExist()

		// expect resulted to be the first created path
		expect(resulted).toBe(expected)
	})

	rmdir('test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('test-dir-deep-1-of-2')

	await test('fse.lstat()', async () => {
		let pathToDir
		let resulted

		pathToDir = path.join(__dirname)

		await expect(async () => {
			resulted = undefined
			resulted = await fse.lstat(pathToDir)
		}).toNotThrow()

		expect(pathToDir).toExist()
		expect(resulted).toBeInstanceOf(fse.Stats)

		pathToDir = path.join(__dirname, 'non-existant-dir')

		await expect(async () => {
			resulted = undefined
			resulted = await fse.lstat(pathToDir)
		}).toThrow()

		expect(pathToDir).toNotExist()
		expect(resulted).toBe(undefined)
	})

	await test('fse.lstatSync()', async () => {
		let pathToDir
		let resulted

		pathToDir = path.join(__dirname)

		expect(() => {
			resulted = undefined
			resulted = fse.lstatSync(pathToDir)
		}).toNotThrow()

		expect(pathToDir).toExist()
		expect(resulted).toBeInstanceOf(fse.Stats)

		pathToDir = path.join(__dirname, 'non-existant-dir')

		expect(() => {
			resulted = undefined
			resulted = fse.lstatSync(pathToDir)
		}).toThrow()

		expect(pathToDir).toNotExist()
		expect(resulted).toBe(undefined)
	})

	await test('fse.rmdir()', async () => {
		let pathToDir
		let resulted

		pathToDir = path.join(__dirname, 'test-dir')

		await fse.mkdir(pathToDir)

		await expect(async () => {
			resulted = undefined
			resulted = await fse.rmdir(pathToDir)
		}).toNotThrow()

		expect(pathToDir).toNotExist()
		expect(resulted).toBe(undefined)
	})

	rmdir('test-dir')

	await test('fse.rmdir() (non-existant)', async () => {
		let pathToDir = path.join(__dirname, 'non-existant-dir')
		let resulted

		await expect(async () => {
			resulted = undefined
			resulted = await fse.rmdir(pathToDir)
		}).toThrow()

		expect(pathToDir).toNotExist()
		expect(resulted).toBe(undefined)
	})

	await test('fse.rmdir() (deep throws)', async () => {
		let path2Dir1 = path.join(__dirname, 'test-dir-deep-1-of-2')
		let path2Dir2 = path.join(path2Dir1, 'test-dir-deep-2-of-2')
		let resulted

		await fse.mkdir(path2Dir2, { recursive: true })

		await expect(async () => {
			resulted = undefined
			resulted = await fse.rmdir(path2Dir1)
		}).toThrow()

		expect(path2Dir2).toExist()
		expect(resulted).toBe(undefined)
	})

	await test('fse.rmdir() (deep recursive)', async () => {
		let path2Dir1 = path.join(__dirname, 'test-dir-deep-1-of-2')
		let path2Dir2 = path.join(path2Dir1, 'test-dir-deep-2-of-2')
		let resulted

		await expect(async () => {
			resulted = undefined
			resulted = await fse.rmdir(path2Dir1, { recursive: true })
		}).toNotThrow()

		expect(path2Dir2).toNotExist()
		expect(resulted).toBe(undefined)
	})

	await test('fse.rmdirSync()', () => {
		let pathToDir
		let resulted

		pathToDir = path.join(__dirname, 'test-dir')

		fse.mkdirSync(pathToDir)

		expect(() => {
			resulted = undefined
			resulted = fse.rmdirSync(pathToDir)
		}).toNotThrow()

		expect(pathToDir).toNotExist()
		expect(resulted).toBe(undefined)
	})

	rmdir('test-dir')

	await test('fse.rmdirSync() (non-existant)', () => {
		let pathToDir = path.join(__dirname, 'non-existant-dir')
		let resulted

		expect(() => {
			resulted = undefined
			resulted = fse.rmdirSync(pathToDir)
		}).toThrow()

		expect(pathToDir).toNotExist()
		expect(resulted).toBe(undefined)
	})

	await test('fse.rmdirSync() (deep throws)', () => {
		let path2Dir1 = path.join(__dirname, 'test-dir-deep-1-of-2')
		let path2Dir2 = path.join(path2Dir1, 'test-dir-deep-2-of-2')
		let resulted

		fse.mkdirSync(path2Dir2, { recursive: true })

		expect(() => {
			resulted = undefined
			resulted = fse.rmdirSync(path2Dir1)
		}).toThrow()

		expect(path2Dir2).toExist()
		expect(resulted).toBe(undefined)
	})

	rmdir('test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('test-dir-deep-1-of-2')

	await test('fse.rmdirSync() (deep recursive)', () => {
		let path2Dir1 = path.join(__dirname, 'test-dir-deep-1-of-2')
		let path2Dir2 = path.join(path2Dir1, 'test-dir-deep-2-of-2')
		let resulted

		fse.mkdirSync(path2Dir1)
		fse.mkdirSync(path2Dir2)

		expect(() => {
			resulted = undefined
			resulted = fse.rmdirSync(path2Dir1, { recursive: true })
		}).toNotThrow()

		expect(path2Dir2).toNotExist()
		expect(resulted).toBe(undefined)
	})

	rmdir('test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('test-dir-deep-1-of-2')

	await test('fse.copydir()', async () => {
		let pathNameA0 = path.join(__dirname, 'to-copy')
		let pathNameA1 = path.join(pathNameA0, 'test-dir-deep-1-of-2')
		let pathNameA2 = path.join(pathNameA1, 'test-dir-deep-2-of-2')
		let pathNameA3 = path.join(pathNameA2, 'test-file')

		let pathNameB0 = path.join(__dirname, 'is-copy')
		let pathNameB1 = path.join(pathNameB0, 'test-dir-deep-1-of-2')
		let pathNameB2 = path.join(pathNameB1, 'test-dir-deep-2-of-2')
		let pathNameB3 = path.join(pathNameB2, 'test-file')

		await fse.touchFile(pathNameA3, { recursive: true })

		await expect(async () => {
			await fse.copydir(pathNameA0, pathNameB0)
		}).toNotThrow()

		expect(pathNameB0).toExist()
		expect(pathNameB1).toExist()
		expect(pathNameB2).toExist()
		expect(pathNameB3).toExist()

		await fse.rmdir(pathNameA0, { recursive: true })
		await fse.rmdir(pathNameB0, { recursive: true })
	})

	rmfile('to-copy', 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2', 'test-file')
	rmdir('to-copy', 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('to-copy', 'test-dir-deep-1-of-2')
	rmdir('to-copy')

	rmfile('is-copy', 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2', 'test-file')
	rmdir('is-copy', 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('is-copy', 'test-dir-deep-1-of-2')
	rmdir('is-copy')

	await test('fse.copydirSync()', () => {
		let pathNameA0 = path.join(__dirname, 'to-copy')
		let pathNameA1 = path.join(pathNameA0, 'test-dir-deep-1-of-2')
		let pathNameA2 = path.join(pathNameA1, 'test-dir-deep-2-of-2')
		let pathNameA3 = path.join(pathNameA2, 'test-file')

		let pathNameB0 = path.join(__dirname, 'is-copy')
		let pathNameB1 = path.join(pathNameB0, 'test-dir-deep-1-of-2')
		let pathNameB2 = path.join(pathNameB1, 'test-dir-deep-2-of-2')
		let pathNameB3 = path.join(pathNameB2, 'test-file')

		fse.touchFileSync(pathNameA3, { recursive: true })

		expect(() => {
			fse.copydirSync(pathNameA0, pathNameB0)
		}).toNotThrow()

		expect(pathNameB0).toExist()
		expect(pathNameB1).toExist()
		expect(pathNameB2).toExist()
		expect(pathNameB3).toExist()

		fse.rmdirSync(pathNameA0, { recursive: true })
		fse.rmdirSync(pathNameB0, { recursive: true })
	})

	rmfile('to-copy', 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2', 'test-file')
	rmdir('to-copy', 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('to-copy', 'test-dir-deep-1-of-2')
	rmdir('to-copy')

	rmfile('is-copy', 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2', 'test-file')
	rmdir('is-copy', 'test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('is-copy', 'test-dir-deep-1-of-2')
	rmdir('is-copy')

	rmfile('test-dir-deep-1-of-2', 'test-dir-deep-2-of-2', 'test-file')
	rmdir('test-dir-deep-1-of-2', 'test-dir-deep-2-of-2')
	rmdir('test-dir-deep-1-of-2')

	rmfile('test-file')
	rmdir('test-dir')
}

/** Tests function and logs the results. */
async function test(name, func) {
	try {
		await func()

		console.log(`\x1b[32m✔\x1b[0m test: ${name}`)
	} catch (error) {
		console.error(`\x1b[31m✖\x1b[0m test: ${name}\n${error.stack}`)

		process.exitCode = 1
	}
}

function rmfile(...pathnames) {
	const pathname = path.join(__dirname, ...pathnames)
	if (fs.existsSync(pathname)) fs.unlinkSync(pathname)
}

function rmdir(...pathnames) {
	const pathname = path.join(__dirname, ...pathnames)
	if (fs.existsSync(pathname)) fs.rmdirSync(pathname)
}

module.exports = unit

if (process.argv[1] === __filename) unit()
