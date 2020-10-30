import { Config } from '@jest/types';
const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer');

import { stopServer } from './server';

export default async (globalConfig: Config.GlobalConfig) => {
  await teardownPuppeteer(globalConfig);
  stopServer();
};
