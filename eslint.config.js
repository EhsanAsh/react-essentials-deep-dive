import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
	{ root: true },
	{ env: { browser: true, es2020: true } },
	{
		ignores: [
			'dist',
			'.eslintrc.cjs',
			'node_modules',
			'package-lock.json',
			'build',
			'dist',
			'README.md',
			'workFlow.md',
			'.hintrc',
		],
	},
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		settings: { react: { version: '18.3' } },
		extends: [
			'eslint:recommended',
			'plugin:react/recommended',
			'plugin:react/jsx-runtime',
			'plugin:react-hooks/recommended',
		],
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...react.configs['jsx-runtime'].rules,
			...reactHooks.configs.recommended.rules,
			'react/jsx-no-target-blank': 'off',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'react/prop-types': 'off',
			'no-undef-init': 'error',
			'no-duplicate-case': 'error',
			'no-irregular-whitespace': 'error',
			'no-multi-spaces': 'error',
			'no-empty': 'error',
			'no-extra-semi': 'error',
			'no-func-assign': 'error',
			'no-unreachable': 'error',
			curly: 'error',
			'dot-notation': 'error',
			eqeqeq: 'error',
			'no-empty-function': 'error',
			'no-mixed-spaces-and-tabs': 'error',
			'no-trailing-spaces': 'error',
			'default-case': 'error',
			'no-fallthrough': 'error',
			'no-unused-vars': 'warn',
			'no-use-before-define': 'error',
			'no-redeclare': 'error',
			'brace-style': 'error',
			indent: ['error', 4],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			radix: 'off',
		},
	},
];
