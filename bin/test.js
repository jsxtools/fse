const lint = require('./test-lint.js')
const unit = require('./test-unit.js')

async function test() {
	await lint()
	await unit()
}

if (process.argv[1] === __filename) test()
