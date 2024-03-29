import { runPa11y } from '../../../src';

describe('`jest-pa11y` end-to-end test', () => {
  it('bad html', async () => {
    expect.assertions(1);
    const results = await runPa11y('<img src="#" />');
    expect(results).not.toHaveNoPa11yViolations();
  });

  it('good html', async () => {
    expect.assertions(1);
    const results = await runPa11y('<img alt="foo" src="#" />', {
      ignore: ['region'],
    });
    expect(results).toHaveNoPa11yViolations();
  });
});
