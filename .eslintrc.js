/*eslint-env node*/
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@next/next/recommended',
    'prettier',
  ],
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      typescript: {
        config: 'tsconfig.json',
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    semi: 'error',
    'import/prefer-default-export': 'off',
    'newline-before-return': 'error',
    'no-console': 'off',
    'no-var': 'error',
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc' },
        'newlines-between': 'always',
      },
    ],
  },
};
