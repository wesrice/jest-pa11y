const tsPreset = require('ts-jest/presets/js-with-babel/jest-preset');
const pa11yPreset = require('jest-pa11y/jest-preset');

module.exports = {
  ...tsPreset,
  ...pa11yPreset,
};
