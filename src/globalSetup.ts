import { Config } from '@jest/types';

import { startServer } from './server';

const { setup: setupPuppeteer } = require('jest-environment-puppeteer');

export default async (globalConfig: Config.GlobalConfig) => {
  startServer();
  await setupPuppeteer(globalConfig);
};
