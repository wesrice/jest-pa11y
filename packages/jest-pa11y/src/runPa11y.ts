import pa11y from 'pa11y';

const isElement = (html: Element | string): html is Element =>
  !!html && typeof html === 'object' && typeof html.tagName === 'string';

const mount = (html: Element | string): string =>
  isElement(html) ? html.outerHTML : html;

export default async (html: Element | string, options = {}): Promise<any> => {
  const mounted = mount(html);

  page.setContent(mounted);

  return pa11y('', {
    // Add Pa11y defaults
    ...(pa11y as any).defaults,

    // Add jest-pa11y defaults
    rootElement: 'body',
    runners: ['axe', 'htmlcs'],
    standard: 'WCAG2AAA',

    // Add options
    ...options,

    // Add immutable properties
    browser,
    ignoreUrl: true,
    page,
  });
};
