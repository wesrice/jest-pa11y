const { runPa11y } = require('jest-pa11y');

describe('`jest-pa11y` end-to-end test', () => {
  it('Bad html', async () => {
    const results = await runPa11y('<img src="#" />');
    expect(results).not.toHaveNoPa11yViolations();
  });

  it('Good html', async () => {
    const results = await runPa11y('<img alt="foo" src="#" />', {
      ignore: [
        'region',
      ],
    });
    expect(results).toHaveNoPa11yViolations();
  });
});

