import { mount, VueClass } from '@vue/test-utils';
import { render } from '@testing-library/vue';
import Vue from 'vue';

import { runPa11y } from '../src';

describe('vue', () => {
  let badElement: VueClass<Vue>;
  let goodElement: VueClass<Vue>;

  beforeAll(() => {
    badElement = Vue.component('good-element', {
      data: () => ({ src: '#' }),
      template: '<img id="test-image" :src="src" />',
    });

    goodElement = Vue.component('bad-element', {
      data: () => ({ src: '#' }),
      template: '<img alt="Image" id="test-image" :src="src" />',
    });
  });

  describe('using Vue Test Utils', () => {
    it('accessible html elements do not throw Jest violations', async () => {
      expect.assertions(2);
      const wrapper = mount(goodElement);
      const results = await runPa11y(wrapper.element, {
        ignore: ['region'],
      });
      expect(() => {
        expect(results).toHaveNoPa11yViolations();
      }).not.toThrow();
    });

    it('inaccessible html elements throw Jest violations', async () => {
      expect.assertions(2);
      const wrapper = mount(badElement);
      const results = await runPa11y(wrapper.element);
      expect(() => {
        expect(results).toHaveNoPa11yViolations();
      }).toThrow(Error);
    });
  });

  describe('using Vue Testing Library', () => {
    it('accessible html elements do not throw Jest violations', async () => {
      expect.assertions(2);
      const { container } = render(goodElement);
      const results = await runPa11y(container, {
        ignore: ['region'],
      });
      expect(() => {
        expect(results).toHaveNoPa11yViolations();
      }).not.toThrow();
    });

    it('inaccessible html elements throw Jest violations', async () => {
      expect.assertions(2);
      const { container } = render(goodElement);
      const results = await runPa11y(container);
      expect(() => {
        expect(results).toHaveNoPa11yViolations();
      }).toThrow(Error);
    });
  });
});
