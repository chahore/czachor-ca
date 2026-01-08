import js from '@eslint/js'
import astro from 'eslint-plugin-astro'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  /* Base JS */
  js.configs.recommended,

  /* TS (safe even if partially used) */
  ...tseslint.configs.recommended,

  /* Astro + a11y */
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],

  /* Ensure .astro parses correctly */
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astro.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
      },
    },
  },

  /* Globals */
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
]
