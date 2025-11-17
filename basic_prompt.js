// Prompt for implementing a `toCamelCase` function.
// The prompt describes expected behavior and includes examples.
const toCamelCasePrompt = `
Write a JavaScript function named \`toCamelCase(input)\` that converts any given string to camelCase.

Requirements:
- Treat spaces, dashes (\`-\`), underscores (\`_\`), dots (\`.\`) and other non-alphanumeric characters as separators.
- Remove punctuation and extra separators.
- Preserve numbers and treat them as part of words.
- The output should be lowerCamelCase: the first word fully lowercase, subsequent words capitalized, with no spaces or separators.
- For null or undefined input, return an empty string.

Examples:
- \`toCamelCase("hello_world")\` -> \`"helloWorld"\`
- \`toCamelCase("Some-mixed_string Example!!")\` -> \`"someMixedStringExample"\`

Provide a clean, well-documented implementation and a few unit-test style examples demonstrating edge cases (leading/trailing separators, multiple separators, numbers).
`;

module.exports = toCamelCasePrompt;

// Usage example (for humans):
// const prompt = require('./basic_prompt');
// console.log(prompt);
