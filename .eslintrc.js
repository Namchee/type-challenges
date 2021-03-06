module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'xo',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
    'prettier',
	],
	rules: {
    'no-unused-vars': 'off',
    'new-cap': 'off',
	},
};
