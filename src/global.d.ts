import { AxeResults } from 'axe-core';

declare global {
  namespace jest {
    interface Matchers<R, T> {
        toHaveNoViolations(results: AxeResults): R;
    }
  }
}
