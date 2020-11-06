module.exports = {
  overrides: [
    {
      extends: ['plugin:import/typescript'],
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        tsconfigRootDir: `${__dirname}/src`,
      },
      plugins: ['@typescript-eslint'],
    },
  ],
};
