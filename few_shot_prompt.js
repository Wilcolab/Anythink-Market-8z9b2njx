// Convert a string to lowerCamelCase (camelCase with initial lowercase)
function toCamelCase(input) {
	if (input == null) return '';
	const str = String(input);

	// 1) Separate camelCase boundaries (e.g. "helloWorld" -> "hello World")
	// 2) Replace any non-alphanumeric sequence with a single space
	// 3) Trim and split into words
	const words = str
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.replace(/[^A-Za-z0-9]+/g, ' ')
		.trim()
		.split(/\s+/)
		.filter(Boolean)
		.map(w => w.toLowerCase());

	if (words.length === 0) return '';

	const first = words[0];
	const rest = words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
	return first + rest;
}

// Examples:
// toCamelCase("first name") -> "firstName"
// toCamelCase("user_id") -> "userId"
// toCamelCase("SCREEN_NAME") -> "screenName"
// toCamelCase("mobile-number") -> "mobileNumber"

module.exports = toCamelCase;

// Optional quick checks (uncomment to run in Node):
// console.log(toCamelCase('first name')) // firstName
// console.log(toCamelCase('user_id')) // userId
// console.log(toCamelCase('SCREEN_NAME')) // screenName
// console.log(toCamelCase('mobile-number')) // mobileNumber
