/**
 * Convert a string to lowerCamelCase (camelCase with an initial lowercase letter).
 *
 * This function normalizes the input by:
 * - trimming leading/trailing whitespace,
 * - treating any non-alphanumeric characters (spaces, hyphens, underscores, dots, punctuation) as delimiters,
 * - collapsing multiple consecutive delimiters into a single separator,
 * - preserving numeric characters within words,
 * - converting words to lowercase and then capitalizing the first letter of each subsequent word.
 *
 * The result follows the lowerCamelCase convention: the first word is entirely lowercase,
 * subsequent words start with an uppercase letter and have no separators.
 *
 * @param {string} input - The input string to convert. Must contain at least one alphanumeric character.
 * @returns {string} The converted string in lowerCamelCase form.
 * @throws {TypeError} If `input` is `null`, `undefined`, or not of type `string`.
 * @throws {Error} If `input` is an empty string after trimming or contains no alphanumeric characters.
 * @example
 * toCamelCase('hello world') // 'helloWorld'
 * @example
 * toCamelCase('user_id') // 'userId'
 * @example
 * toCamelCase('SCREEN_NAME') // 'screenName'
 * @see {@link toDotCase} for a dot-separated variant.
 */
function toCamelCase(input) {
	if (input === null || input === undefined) {
		throw new TypeError('toCamelCase: input is required and must be a string');
	}
	if (typeof input !== 'string') {
		throw new TypeError(`toCamelCase: expected a string but received ${typeof input}`);
	}
	// Trim surrounding whitespace first
	const trimmed = input.trim();
	if (trimmed.length === 0) {
		throw new Error('toCamelCase: input is an empty string after trimming');
	}

	// Replace any sequence of non-alphanumeric characters with a single space.
	// This treats punctuation and repeated delimiters as separators.
	const cleaned = trimmed.replace(/[^A-Za-z0-9]+/g, ' ');

	// Split into words, filter out empties, and lowercase for normalization
	const parts = cleaned
		.split(/\s+/)
		.filter(Boolean)
		.map(part => part.toLowerCase());

	if (parts.length === 0) {
		throw new Error('toCamelCase: input contains no alphanumeric characters');
	}

	// First word stays lowercase; subsequent words are capitalized
	const first = parts[0];
	const rest = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
	return first + rest;
}

/**
 * Convert a string to dot.case (lowercase words separated by a single dot).
 *
 * Behavior mirrors `toCamelCase`'s normalization rules but outputs words joined by dots:
 * - trims whitespace,
 * - treats non-alphanumeric characters as delimiters,
 * - collapses repeated delimiters,
 * - preserves numeric characters,
 * - lowercases all word segments.
 *
 * Example transformations:
 * - `"hello world"` -> `"hello.world"`
 * - `"user_id"` -> `"user.id"`
 * - `"SCREEN_NAME"` -> `"screen.name"`
 * - `"mobile-number"` -> `"mobile.number"`
 *
 * @param {string} input - The input string to convert. Must be a non-empty string containing at least one alphanumeric character.
 * @returns {string} The converted dot.case string.
 * @throws {TypeError} If `input` is `null`, `undefined`, or not of type `string`.
 * @throws {Error} If `input` is an empty string after trimming or contains no alphanumeric characters.
 * @example
 * toDotCase('Hello World') // 'hello.world'
 */
function toDotCase(input) {
	if (input === null || input === undefined) {
		throw new TypeError('toDotCase: input is required and must be a string');
	}
	if (typeof input !== 'string') {
		throw new TypeError(`toDotCase: expected a string but received ${typeof input}`);
	}

	const trimmed = input.trim();
	if (trimmed.length === 0) {
		throw new Error('toDotCase: input is an empty string after trimming');
	}

	// Replace any sequence of non-alphanumeric characters with a single dot.
	let cleaned = trimmed.replace(/[^A-Za-z0-9]+/g, '.');
	// Collapse multiple dots and trim leading/trailing dots
	cleaned = cleaned.replace(/\.+/g, '.').replace(/^\.|\.$/g, '');

	const parts = cleaned.split('.').filter(Boolean).map(p => p.toLowerCase());
	if (parts.length === 0) {
		throw new Error('toDotCase: input contains no alphanumeric characters');
	}

	return parts.join('.');
}

module.exports = {
	toCamelCase,
	toDotCase,
};

// Quick examples (uncomment to run in Node):
// console.log(toCamelCase('hello world')) // "helloWorld"
// console.log(toDotCase('hello world')) // "hello.world"

