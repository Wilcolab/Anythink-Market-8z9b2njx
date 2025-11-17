/**
 * Convert an input string to kebab-case (lowercase words separated by hyphens).
 *
 * Steps:
 * 1) Validate input: must be a non-empty string. Reject null, undefined, numbers, arrays, and plain objects.
 * 2) Normalize:
 *    - Insert separators between camelCase boundaries (e.g. `helloWorld` -> `hello World`).
 *    - Replace underscores and multiple whitespace with a single space.
 *    - Remove punctuation except alphanumeric characters and delimiters (spaces and hyphens).
 *    - Convert to lowercase.
 * 3) Tokenize on spaces and remaining delimiters, filter empty tokens, and join with single hyphens.
 * 4) Throw descriptive errors for invalid inputs.
 *
 * @param {string} input
 * @returns {string} kebab-case string
 * @throws {TypeError} if input is not a string or is an array/object/number
 * @throws {Error} if input is empty after trimming or contains no alphanumeric characters
 */
function toKebabCase(input) {
  // Basic type checks
  if (input === null || input === undefined) {
    throw new TypeError('toKebabCase: input is required and must be a non-empty string');
  }
  if (typeof input !== 'string') {
    // Explicitly reject arrays and plain objects
    if (Array.isArray(input)) {
      throw new TypeError('toKebabCase: expected a string but received an array');
    }
    if (typeof input === 'object') {
      throw new TypeError('toKebabCase: expected a string but received an object');
    }
    throw new TypeError(`toKebabCase: expected a string but received ${typeof input}`);
  }

  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error('toKebabCase: input is an empty string after trimming');
  }

  // 1) Insert space between camelCase boundaries: 'aB' -> 'a B'
  let s = trimmed.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

  // 2) Replace underscores and any sequence of whitespace with a single space
  s = s.replace(/[_\s]+/g, ' ');

  // 3) Remove punctuation except alphanumerics, spaces and hyphens
  //    Keep hyphens because existing hyphens may be intended delimiters
  s = s.replace(/[^A-Za-z0-9 \-]+/g, '');

  // 4) Normalize sequences of spaces and hyphens into single spaces,
  //    so tokenization is consistent (we'll join with hyphens later)
  s = s.replace(/[ \-]+/g, ' ').trim();

  // 5) Tokenize, filter empties and lowercase
  const parts = s.split(' ').filter(Boolean).map(p => p.toLowerCase());
  if (parts.length === 0) {
    throw new Error('toKebabCase: input contains no alphanumeric characters');
  }

  // 6) Join with single hyphens — guarantees no leading/trailing or consecutive hyphens
  return parts.join('-');
}

module.exports = toKebabCase;

// Examples / short tests:
// Normal:   toKebabCase('Hello World!') => 'hello-world'
// CamelCase: toKebabCase('helloWorldTest') => 'hello-world-test'
// Invalid:  toKebabCase(null) => throws TypeError('toKebabCase: input is required and must be a non-empty string')
