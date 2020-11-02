import pa11y from 'pa11y';
import { mocked } from 'ts-jest/utils';

import * as jestPally from '.';
import * as runPa11y from './runPa11y';

const { configurePa11y } = jestPally;

const mockedPa11y = mocked(pa11y, true);
const actualPa11y = jest.requireActual('pa11y');

describe('configurePa11y()', () => {
  afterEach(async () => {
    jest.clearAllMocks();
    await jestPuppeteer.resetPage();
  });

  it('returns an anonymous function', async () => {
    expect.assertions(1);
    const fn = configurePa11y();
    expect(fn).toBeInstanceOf(Function);
  });

  it('anonymous function passes html and options to `runPa11y()`', async () => {
    expect.assertions(2);
    const spy = jest.spyOn(runPa11y, 'default');
    const html = '<a href="#"></a>';
    const options = {
      foo: 'foo',
    };
    const fn = configurePa11y();
    await fn(html, options);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0]).toMatchObject([html, options]);
  });

  it('anonymous function combines options with configuration options', async () => {
    expect.assertions(2);
    const spy = jest.spyOn(runPa11y, 'default');
    const html = '<a href="#"></a>';

    const globalOptions = {
      foo: 'foo',
    };
    const fn = configurePa11y(globalOptions);

    const anonymousOptions = {
      bar: 'bar',
    };
    await fn(html, anonymousOptions);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0]).toMatchObject([
      html,
      {
        ...globalOptions,
        ...anonymousOptions,
      },
    ]);
  });

  it('options of anonymous function has precendence over configuration options', async () => {
    expect.assertions(2);
    const spy = jest.spyOn(runPa11y, 'default');
    const html = '<a href="#"></a>';

    const globalOptions = {
      foo: 'foo',
    };
    const fn = configurePa11y(globalOptions);

    const anonymousOptions = {
      foo: 'fooo',
      bar: 'bar',
    };
    await fn(html, anonymousOptions);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0]).toMatchObject([html, anonymousOptions]);
  });

  describe('by default', () => {
    it('extends Pa11y default options', async () => {
      expect.assertions(2);
      const fn = configurePa11y();
      await fn('<a href="#"></a>');
      expect(mockedPa11y).toHaveBeenCalledTimes(1);
      const [, options] = mockedPa11y.mock.calls[0];

      // Reset options that will always be mutated back to default values
      const expectedDefaults = {
        ...options,
        browser: null,
        ignoreUrl: false,
        page: undefined,
        rootElement: null,
        runners: ['htmlcs'],
        standard: 'WCAG2AA',
      };
      delete expectedDefaults.page;

      expect(expectedDefaults).toStrictEqual(actualPa11y.defaults);
    });

    it('both Axe and HTML_CS runners are used', async () => {
      expect.assertions(2);
      const fn = configurePa11y();
      await fn('<a href="#"></a>');
      expect(mockedPa11y).toHaveBeenCalledTimes(1);
      const [, options] = mockedPa11y.mock.calls[0];
      expect(options?.runners).toStrictEqual(['axe', 'htmlcs']);
    });

    it('wCAG2AAA standard is used', async () => {
      expect.assertions(2);
      const fn = configurePa11y();
      await fn('<a href="#"></a>');
      expect(mockedPa11y).toHaveBeenCalledTimes(1);
      const [, options] = mockedPa11y.mock.calls[0];
      expect(options?.standard).toBe('WCAG2AAA');
    });
  });
});
