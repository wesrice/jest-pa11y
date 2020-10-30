import { Config } from '@jest/types';
const { setup: setupPuppeteer } = require('jest-environment-puppeteer');

import { startServer } from './server';

export default async (globalConfig: Config.GlobalConfig) => {
  startServer();
  await setupPuppeteer(globalConfig);
};
