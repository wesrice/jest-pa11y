import { Config } from '@jest/types';

import { stopServer } from './server';

const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer');

export default async (globalConfig: Config.GlobalConfig) => {
  await teardownPuppeteer(globalConfig);
  stopServer();
};
