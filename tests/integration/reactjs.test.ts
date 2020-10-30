import { render } from '@testing-library/react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { runPa11y } from '../../src'

describe('React', () => {
  let goodElement: React.ReactElement;
  let badElement: React.ReactElement;

  beforeAll(() => {
    goodElement = React.createElement('img', { alt: 'Image', src: '#' });
    badElement = React.createElement('img', { src: '#' });
  });

  describe('using ReactDOMServer', () => {
    it('accessible html elements do not throw Jest violations', async () => {
      const html = ReactDOMServer.renderToString(goodElement)
      const results = await runPa11y(html, {
        ignore: [
          'region',
        ],
      });
      expect(() => {
        expect(results).toHaveNoPa11yViolations();
      }).not.toThrowError();
    });

    it('inaccessible html elements throw Jest violations', async () => {
      const html = ReactDOMServer.renderToString(badElement)
      const results = await runPa11y(html)
      expect(() => {
        expect(results).toHaveNoPa11yViolations();
      }).toThrowError();
    });
  });

  describe('using React Testing Library', () => {
    it('accessible html elements do not throw Jest violations', async () => {
      const { container } = render(goodElement);
      const results = await runPa11y(container, {
        ignore: [
          'region',
        ],
      });
      expect(() => {
        expect(results).toHaveNoPa11yViolations();
      }).not.toThrowError();
    });

    it('inaccessible html elements throw Jest violations', async () => {
      const { container } = render(badElement);
      const results = await runPa11y(container);
      expect(() => {
        expect(results).toHaveNoPa11yViolations();
      }).toThrowError();
    });
  })

  describe('using Enzyme', () => {
    beforeAll(() => {
      configure({ adapter: new Adapter() });
    });

    it('accessible html elements do not throw Jest violations', async () => {
      const wrapper = mount(goodElement);
      const results = await runPa11y(wrapper.getDOMNode(), {
        ignore: [
          'region',
        ],
      });
      expect(() => {
        expect(results).toHaveNoPa11yViolations();
      }).not.toThrowError();
    });

    it('inaccessible html elements throw Jest violations', async () => {
      const wrapper = mount(badElement);
      const results = await runPa11y(wrapper.getDOMNode());
      expect(() => {
        expect(results).toHaveNoPa11yViolations();
      }).toThrowError();
    });
  });
});
