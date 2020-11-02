import pa11y from 'pa11y';
import { mocked } from 'ts-jest/utils';

import * as jestPally from '.';

const { configurePa11y, runPa11y } = jestPally;

const mockedPa11y = mocked(pa11y, true);
const actualPa11y = jest.requireActual('pa11y');

describe('runPa11y()', () => {
  afterEach(async () => {
    jest.clearAllMocks();
    await jestPuppeteer.resetPage();
  });

  it('calls pa11y()', async () => {
    expect.assertions(1);
    await runPa11y('');
    expect(mockedPa11y).toHaveBeenCalledTimes(1);
  });

  it('html parameter can be a string', async () => {
    expect.assertions(1);
    const htmlString = '<a href="#"></a>';
    await runPa11y(htmlString);
    const [, options] = mockedPa11y.mock.calls[0];
    expect(await options?.page?.content()).toContain(htmlString);
  });

  it('converts an html element parameter to string', async () => {
    expect.assertions(1);
    const htmlElement: Element = document.createElement('a');
    await runPa11y(htmlElement);
    const [, options] = mockedPa11y.mock.calls[0];
    expect(await options?.page?.content()).toContain(htmlElement.toString());
  });

  it('always calls pa11y() is an empty string as the first parameter', async () => {
    expect.assertions(2);
    const htmlElement: Element = document.createElement('a');
    await runPa11y(htmlElement);
    expect(mockedPa11y.mock.calls[0][0]).toBe('');

    jest.clearAllMocks();

    const htmlString = '<a href="#"></a>';
    await runPa11y(htmlString);
    expect(mockedPa11y.mock.calls[0][0]).toBe('');
  });

  it('returns Pa11y results', async () => {
    expect.assertions(1);
    const htmlString = '<a href="#"></a>';
    const results = await runPa11y(htmlString);
    expect(results).toStrictEqual(await mockedPa11y.mock.results[0].value);
  });

  describe('pa11y options', () => {
    it('extends Pa11y default options', async () => {
      expect.assertions(2);
      const fn = configurePa11y();
      await fn('<a href="#"></a>');
      expect(mockedPa11y).toHaveBeenCalledTimes(1);
      const [, options] = mockedPa11y.mock.calls[0];

      if (!options) {
        throw new Error('No options found');
      }

      expect(Object.keys(options)).toStrictEqual(
        expect.arrayContaining(Object.keys(actualPa11y.defaults)),
      );
    });

    describe('`jest-pa11y` specific default options', () => {
      describe('option: `rootElement`', () => {
        it('defaults to `body`', async () => {
          expect.assertions(2);

          const fn = configurePa11y();
          await fn('<a href="#"></a>');
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.rootElement).toBeNull();
          expect(options.rootElement).toBe('body');
        });

        it('can be overridden via `configurePa11y()`', async () => {
          expect.assertions(2);

          const fn = configurePa11y({
            rootElement: 'foo',
          });
          await fn('<a href="#"></a>');
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.rootElement).toBeNull();
          expect(options.rootElement).toBe('foo');
        });

        it('can be overridden via `runPa11y()`', async () => {
          expect.assertions(2);
          const fn = configurePa11y();
          await fn('<a href="#"></a>', {
            rootElement: 'foo',
          });
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.rootElement).toBeNull();
          expect(options.rootElement).toBe('foo');
        });
      });

      describe('option: `runners`', () => {
        it('defaults to `axe` and `htmlcs`', async () => {
          expect.assertions(2);
          const fn = configurePa11y();
          await fn('<a href="#"></a>');
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.runners).toStrictEqual(['htmlcs']);
          expect(options.runners).toStrictEqual(['axe', 'htmlcs']);
        });

        it('can be overridden via `configurePa11y()`', async () => {
          expect.assertions(2);
          const fn = configurePa11y({
            runners: ['axe'],
          });
          await fn('<a href="#"></a>');
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.runners).toStrictEqual(['htmlcs']);
          expect(options.runners).toStrictEqual(['axe']);
        });

        it('can be overridden via `runPa11y()`', async () => {
          expect.assertions(2);
          const fn = configurePa11y();
          await fn('<a href="#"></a>', {
            runners: ['axe'],
          });
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.runners).toStrictEqual(['htmlcs']);
          expect(options.runners).toStrictEqual(['axe']);
        });
      });

      describe('option: `standard`', () => {
        it('defaults to `WCAG2AAA`', async () => {
          expect.assertions(2);
          const fn = configurePa11y();
          await fn('<a href="#"></a>');
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.standard).toBe('WCAG2AA');
          expect(options.standard).toBe('WCAG2AAA');
        });

        it('can be overridden via `configurePa11y()`', async () => {
          expect.assertions(2);
          const fn = configurePa11y({
            standard: 'WCAG2A',
          });
          await fn('<a href="#"></a>');
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.standard).toBe('WCAG2AA');
          expect(options.standard).toBe('WCAG2A');
        });

        it('can be overridden via `runPa11y()`', async () => {
          expect.assertions(2);
          const fn = configurePa11y();
          await fn('<a href="#"></a>', {
            standard: 'WCAG2A',
          });
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.standard).toBe('WCAG2AA');
          expect(options.standard).toBe('WCAG2A');
        });
      });
    });

    describe('`jest-pa11y` immutable options', () => {
      describe('option: `browser`', () => {
        it('defaults to Puppeteer Browser instance', async () => {
          expect.assertions(2);
          const fn = configurePa11y();
          await fn('<a href="#"></a>');
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.browser).toBeNull();
          expect(options.browser?.constructor.name).toBe('Browser');
        });

        it('cannot be overriden via `configurePa11y()`', async () => {
          expect.assertions(2);
          const fn = configurePa11y({
            browser: null,
          });
          await fn('<a href="#"></a>');
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.browser).toBeNull();
          expect(options.browser?.constructor.name).toBe('Browser');
        });

        it('cannot be overriden via `runPa11y()`', async () => {
          expect.assertions(2);
          const fn = configurePa11y();
          await fn('<a href="#"></a>', {
            browser: null,
          });
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.browser).toBeNull();
          expect(options.browser?.constructor.name).toBe('Browser');
        });
      });

      describe('option: `ignoreUrl`', () => {
        it('defaults to `true`', async () => {
          expect.assertions(2);
          const fn = configurePa11y();
          await fn('<a href="#"></a>');
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.ignoreUrl).toBe(false);
          expect(options.ignoreUrl).toBe(true);
        });

        it('cannot be overriden via `configurePa11y()`', async () => {
          expect.assertions(2);
          const fn = configurePa11y({
            ignoreUrl: false,
          });
          await fn('<a href="#"></a>');
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.ignoreUrl).toBe(false);
          expect(options.ignoreUrl).toBe(true);
        });

        it('cannot be overriden via `runPa11y()`', async () => {
          expect.assertions(2);
          const fn = configurePa11y();
          await fn('<a href="#"></a>', {
            ignoreUrl: false,
          });
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.ignoreUrl).toBe(false);
          expect(options.ignoreUrl).toBe(true);
        });
      });

      describe('option: `page`', () => {
        it('defaults to Puppeteer Page instance', async () => {
          expect.assertions(2);
          const fn = configurePa11y();
          await fn('<a href="#"></a>');
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.page).toBeUndefined();
          expect(options.page?.constructor.name).toBe('Page');
        });

        it('cannot be overriden via `configurePa11y()`', async () => {
          expect.assertions(2);
          const fn = configurePa11y({
            page: null,
          });
          await fn('<a href="#"></a>');
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.page).toBeUndefined();
          expect(options.page?.constructor.name).toBe('Page');
        });

        it('cannot be overriden via `runPa11y()`', async () => {
          expect.assertions(2);
          const fn = configurePa11y();
          await fn('<a href="#"></a>', {
            page: null,
          });
          const [, options] = mockedPa11y.mock.calls[0];

          if (!options) {
            throw new Error('No options found');
          }

          expect(actualPa11y.defaults.page).toBeUndefined();
          expect(options.page?.constructor.name).toBe('Page');
        });
      });
    });
  });
});
