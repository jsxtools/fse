const esbuild = require('esbuild')

async function build() {
	const esmPromise = esbuild.build({
		bundle: true,
		entryPoints: ['./src/index.js'],
		format: 'esm',
		external: ['fs', 'path'],
		outfile: './index.mjs',
	})

	const cjsPromise = esbuild.build({
		bundle: true,
		entryPoints: ['./src/index.js'],
		format: 'cjs',
		external: ['fs', 'path'],
		outfile: './index.cjs',
	})

	await esmPromise
	await cjsPromise

	console.error('\x1b[32m✔\x1b[0m build fse')
}

module.exports = build

if (process.argv[1] === __filename) build()
