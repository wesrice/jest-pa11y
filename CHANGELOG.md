# Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.4](https://github.com/wesrice/jest-pa11y/compare/v1.1.3...v1.1.4) (2020-11-04)


### Bug Fixes

* add TypeScript e2e tests to ensure typings work properly ([0937a42](https://github.com/wesrice/jest-pa11y/commit/0937a4228e1ccc1c3cd51d0217ee954369867b94))

## [1.1.3](https://github.com/wesrice/jest-pa11y/compare/v1.1.2...v1.1.3) (2020-11-04)


### Bug Fixes

* ensure `toHaveNoPa11yViolations` is exported from module ([1d59149](https://github.com/wesrice/jest-pa11y/commit/1d59149ee775715f4a5b1ba978063512fba081ec))
* ensure Jest preset is exported as part of NPM package ([589f919](https://github.com/wesrice/jest-pa11y/commit/589f919d1bf35604398c617e9006616a09267af6))
* ensure typings are found ([e579d73](https://github.com/wesrice/jest-pa11y/commit/e579d7304957b86cbe08b49abd40fd9b29feaf1d))
* jest no longer hangs on macOS ([ed664b8](https://github.com/wesrice/jest-pa11y/commit/ed664b8cc9c89a8f1f4ea6028db373b75c5b4b0c))

## [1.1.2](https://github.com/wesrice/jest-pa11y/compare/v1.1.1...v1.1.2) (2020-11-03)


### Bug Fixes

* only publish build files ([04db3ba](https://github.com/wesrice/jest-pa11y/commit/04db3baf90ed2c7fa4bd818bdd80136e43d721f1))

## [1.1.1](https://github.com/wesrice/jest-pa11y/compare/v1.1.0...v1.1.1) (2020-11-03)


### Bug Fixes

* include all files in npm package ([ae35ff6](https://github.com/wesrice/jest-pa11y/commit/ae35ff69590232dc7e5fdc4798b58321e2aae7e2))
* package TypeScript configs when publishing to NPM ([a19cdd0](https://github.com/wesrice/jest-pa11y/commit/a19cdd0a762c4c25cac5b192bc214a2a8d14dc10))
* remove passing of commit message to commitizen ([badc7c7](https://github.com/wesrice/jest-pa11y/commit/badc7c7ee8f270c540ea45a786c551d2f6a272b8))

# [1.1.0](https://github.com/wesrice/jest-pa11y/compare/v1.0.0...v1.1.0) (2020-11-03)


### Bug Fixes

* prevent running of test workflow in release branch pushes ([f77c375](https://github.com/wesrice/jest-pa11y/commit/f77c37521d378b6e1c8eeacc8b99f2c3c78736f9))


### Features

* add Commitizen integration ([136cf3c](https://github.com/wesrice/jest-pa11y/commit/136cf3c52ce22b5441990bb929601aca80a57caf))
* remove assets from distribution pipeline ([7bad382](https://github.com/wesrice/jest-pa11y/commit/7bad3825af87693af54494d629d2e1d78c01f8bd))

# 1.0.0 (2020-11-03)


### Bug Fixes

* change default release branch to `main` ([825b515](https://github.com/wesrice/jest-pa11y/commit/825b5151280db78c93ce946da2a8f19524a090af))
* commit npm lockfiles ([f161f05](https://github.com/wesrice/jest-pa11y/commit/f161f05f6e7936f1791aa654c5dd1f2c2045eeaa))
* only test on ubuntu to save CI/CD resources ([16faecc](https://github.com/wesrice/jest-pa11y/commit/16faeccff0afe9289cdc3319111b379422a0fb83))
* semantic release branch config ([7a5f895](https://github.com/wesrice/jest-pa11y/commit/7a5f8950226396402a5304af57291ceef136b333))


### Features

* add commit linting ([cd984d8](https://github.com/wesrice/jest-pa11y/commit/cd984d857b47919bbe1c82acb60419151ad8f54e))
* add semantic release integration ([be908fb](https://github.com/wesrice/jest-pa11y/commit/be908fbf66c9ed74985c2694a8faf2b65c80ad07))
* only run the release workflow when pushing changes to the release branch ([5f0358f](https://github.com/wesrice/jest-pa11y/commit/5f0358f4286e0d514c904dff0ed38465519bafac))
* require Node v12 or greater ([fc20750](https://github.com/wesrice/jest-pa11y/commit/fc2075093f3e81c7de024dab0a913296e6a4fd71))
