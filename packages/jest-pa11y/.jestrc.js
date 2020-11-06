const tsPreset = require('ts-jest/presets/js-with-babel/jest-preset');

module.exports = {
  ...tsPreset,
  globalSetup: './src/globalSetup.ts',
  globalTeardown: './src/globalTeardown.ts',
  modulePathIgnorePatterns: ['./build', './tests/e2e'],
  setupFilesAfterEnv: ['./src/extendExpect.ts'],
  testEnvironment: './src/environment.js',
};
