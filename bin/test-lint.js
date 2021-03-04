const { ESLint } = require('eslint')

async function lint() {
	try {
		const eslint = new ESLint({ fix: true })

		const results = await eslint.lintFiles(['src/{*,**/*}.js'])

		await ESLint.outputFixes(results)

		const formatter = await eslint.loadFormatter('stylish')
		const resultText = '\x1b[32m✔\x1b[0m eslint' + formatter.format(results)

		console.log(resultText)
	} catch (error) {
		process.exitCode = 1

		console.error('\x1b[31m✖\x1b[0m eslint' + error.stack)
	}
}

module.exports = lint

if (process.argv[1] === __filename) lint()
