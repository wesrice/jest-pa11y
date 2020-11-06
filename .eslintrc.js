module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/all',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:security/recommended',
  ],
  globals: {
    browser: true,
    context: true,
    jestPuppeteer: true,
    page: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['jest', 'import', 'prettier', 'security'],
  root: true,
  rules: {
    'jest/no-hooks': ['error', { allow: ['afterEach', 'beforeAll'] }],
    'prettier/prettier': 'error',
  },
};
