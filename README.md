<h4 align="center">
  <small>🚨 🚨 🚨  Using `jest-pa11y` does not guarantee what your components are accessible!  🚨 🚨 🚨</small>
</h4>

* * *

## jest-pa11y

`jest-pa11y` is a custom [Jest](https://jestjs.io/) matcher for [Pa11y](https://pa11y.org/),
useful for testing the accessibility of html, React components or Vue components.

Pa11y's api is typically geared towards testing the accessibility of a url.
`jest-pa11y` allows for the testing for accessibility issues at the component
level, rather than at the page level, providing more clarity as to which parts
of pages are having issues, and allowing you to easily test the accessibility of
different states of your components.

## How it works
`jest-pa11y` starts a simple http server serving a webpage. Html or Node
Elements provided to `runPa11y()` are rendered to a string and then rendered to
the webpage via Puppeteer. Then Pa11y is used to analyze the content of the
webpage, returning an array of voilations if any are found. The results can then
be used in assertions via the expect extension `.toHaveNoPa11yViolations()`.

## Installation
```bash
npm install --save-dev jest-pa11y
```

or

```bash
yarn add --save-dev jest-pa11y
```

## Usage

```json
// jest.config.js
{
  "preset": "jest-pa11y"
}
```

```javascript
const { runPa11y } = require('jest-pa11y');

it('should demonstrate this matcher`s usage', async () => {
  const render = () => '<img src="#"/>';
  const html = render();
  expect(await runPa11y(html)).toHaveNoPa11yViolations();
});
```

![Screenshot of the resulting output from the usage example](example-cli.png)

### Pa11y configuration

The `runPa11y` function allows options to be set with the [same options as documented in Pa11y](https://github.com/pa11y/pa11y#configuration):

```javascript
const { runPa11y } = require('jest-pa11y');

it('image has no Pa11y violations', async () => {
  const results = await runPa11y('<img src="#"/>', {
    standard: 'WCAG2AA',
  });

  expect(results).toHaveNoPa11yViolations();
});

it('button has no Pa11y violations', async () => {
  const results = await runPa11y('<img src="#"/>', {
    standard: 'WCAG2AA',
  });

  expect(results).toHaveNoPa11yViolations();
});
```

Additionally, the `configurePa11y` function returns a preconfigured `runPa11y`
function. This is useful if you want to globally configure Pa11y.

```javascript
const { configurePa11y } = require('jest-pa11y');

const runPa11y = configurePa11y({
  standard: 'WCAG2AA',
});

it('image has no Pa11y violations', async () => {
  const results = await runPa11y('<img src="#"/>');
  expect(results).toHaveNoPa11yViolations();
});

it('button has no Pa11y violations', async () => {
  const results = await runPa11y('<img src="#"/>');
  expect(results).toHaveNoPa11yViolations();
});
```

## Inspiration
This project was originally inspired by and forked from
[jest-axe](https://github.com/nickcolley/jest-axe). `jest-pa11y` differs in that
it uses Pa11y to implement both [aXe](https://github.com/dequelabs/axe-core) and
[HTML_CodeSniffer](https://github.com/squizlabs/HTML_CodeSniffer). Pa11y also
normalizes the output between both runners to help provide consistent a feedback
format for both runners.
