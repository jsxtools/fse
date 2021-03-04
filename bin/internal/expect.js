const { AssertionError, deepStrictEqual: toEqual, strictEqual: toBe, notDeepStrictEqual: toNotEqual, notStrictEqual: toNotBe } = require('assert')
const { existsSync } = require('fs')

module.exports = function expect(actual) {
	return {
		/** Tests for strict equality between the actual and expected parameters. */
		toBe: toBe.bind(this, actual),
		/** Tests for loose equality between the actual value and false in a boolean context. */
		toBeFalsey: toBeFalsey.bind(this, actual),
		/** Tests that the actual object is an instance of the expected class. */
		toBeInstanceOf: toBeInstanceOf.bind(this, actual),
		/** Tests for loose equality between the actual value and true in a boolean context. */
		toBeTruthy: toBeTruthy.bind(this, actual),
		/** Tests for deep equality between the actual and expected parameters. */
		toEqual: toEqual.bind(this, actual),
		/** Tests that the actual path does exist. */
		toExist: toExist.bind(this, actual),
		/** Tests that the actual value does match the expected length. */
		toHaveLength: toHaveLength.bind(this, actual),
		/** Tests that the actual function does throw when it is called. */
		toThrow: toThrow.bind(this, actual),

		/** Tests for strict inequality between the actual and expected parameters. */
		toNotBe: toNotBe.bind(this, actual),
		/** Tests for loose inequality between the actual value and false in a boolean context. */
		toNotBeFalsey: toNotBeFalsey.bind(this, actual),
		/** Tests that the actual object is not an instance of the expected class. */
		toNotBeInstanceOf: toNotBeInstanceOf.bind(this, actual),
		/** Tests for loose inequality between the actual value and true in a boolean context. */
		toNotBeTruthy: toNotBeTruthy.bind(this, actual),
		/** Tests for deep inequality between the actual and expected parameters. */
		toNotEqual: toNotEqual.bind(this, actual),
		/** Tests that the actual path does not exist. */
		toNotExist: toNotExist.bind(this, actual),
		/** Tests that the actual value does not match the expected length. */
		toNotHaveLength: toNotHaveLength.bind(this, actual),
		/** Tests that the actual function does not throw when it is called. */
		toNotThrow: toNotThrow.bind(this, actual),
	}
}

/** Tests that the actual object is an instance of the expected class. */
function toBeInstanceOf(actual, expected) {
	if (!(actual instanceof expected)) {
		throw new AssertionError({
			message: 'Expected value to be instance:',
			operator: 'instanceOf',
			actual,
			expected,
			stackStartFn: toBeInstanceOf,
		})
	}
}

/** Tests that the actual object is not an instance of the expected class. */
function toNotBeInstanceOf(actual, expected) {
	if (actual instanceof expected) {
		throw new AssertionError({
			message: 'Expected value to be instance:',
			operator: 'instanceOf',
			actual,
			expected,
			stackStartFn: toNotBeInstanceOf,
		})
	}
}

/** Tests that the actual function does throw when it is called. */
async function toThrow(actualFunction, expected) {
	let actual = undefined

	try {
		actual = await actualFunction()
	} catch (error) {
		// do nothing and continue
		return
	}

	throw new AssertionError({
		message: 'Expected exception:',
		operator: 'throws',
		stackStartFn: toThrow,
		actual,
		expected,
	})
}

/** Tests that the actual function does not throw when it is called. */
async function toNotThrow(actualFunction, expected) {
	let actual = undefined

	try {
		actual = await actualFunction()

		// do nothing and continue
		return
	} catch (error) {
		throw new AssertionError({
			message: 'Unexpected exception:',
			operator: 'doesNotThrow',
			stackStartFn: toThrow,
			actual,
			expected,
		})
	}
}

/** Tests that the actual path does exist. */
function toExist(actual) {
	if (!existsSync(actual)) {
		throw new AssertionError({
			message: 'Expected path to exist:',
			operator: 'exists',
			stackStartFn: toExist,
			actual: true,
			expected: false,
		})
	}
}

/** Tests that the actual path does not exist. */
function toNotExist(actual) {
	if (existsSync(actual)) {
		throw new AssertionError({
			message: 'Expected path not to exist:',
			operator: 'doesNotExist',
			stackStartFn: toNotExist,
			actual: false,
			expected: true,
		})
	}
}

/** Tests that the actual value does match the expected length. */
function toHaveLength(actual, expected) {
	if (Object(actual).length === expected) {
		throw new AssertionError({
			message: 'Expected value to match length:',
			operator: 'doesHaveLength',
			actual,
			expected,
			stackStartFn: toHaveLength,
		})
	}
}

/** Tests that the actual value does not match the expected length. */
function toNotHaveLength(actual, expected) {
	if (Object(actual).length === expected) {
		throw new AssertionError({
			message: 'Expected value to not match length:',
			operator: 'doesNotHaveLength',
			actual,
			expected,
			stackStartFn: toNotHaveLength,
		})
	}
}

/** Tests for loose equality between the actual value and false in a boolean context. */
function toBeFalsey(actual) {
	if (actual) {
		throw new AssertionError({
			message: 'Expected value to be falsey:',
			operator: 'isFalsey',
			actual,
			expected: false,
			stackStartFn: toBeFalsey,
		})
	}
}

/** Tests for loose inequality between the actual value and false in a boolean context. */
function toNotBeFalsey(actual) {
	if (!actual) {
		throw new AssertionError({
			message: 'Expected value to not be falsey:',
			operator: 'isNotFalsey',
			actual,
			expected: true,
			stackStartFn: toNotBeFalsey,
		})
	}
}

/** Tests for loose equality between the actual value and true in a boolean context. */
function toBeTruthy(actual) {
	if (!actual) {
		throw new AssertionError({
			message: 'Expected value to be truthy:',
			operator: 'isTruthy',
			actual,
			expected: false,
			stackStartFn: toBeTruthy,
		})
	}
}

/** Tests for loose inequality between the actual value and true in a boolean context. */
function toNotBeTruthy(actual) {
	if (actual) {
		throw new AssertionError({
			message: 'Expected value to not be truthy:',
			operator: 'isNotTruthy',
			actual,
			expected: true,
			stackStartFn: toNotBeTruthy,
		})
	}
}
