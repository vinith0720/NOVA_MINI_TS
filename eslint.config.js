import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  {
    ignores: ['node_modules', 'dest', 'migrations', 'seeders'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      // '@typescript-eslint/no-explicit-any': 'off',
      // '@typescript-eslint/no-empty-object-type': 'off',
      // '@typescript-eslint/no-namespace': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  prettier,
]);
