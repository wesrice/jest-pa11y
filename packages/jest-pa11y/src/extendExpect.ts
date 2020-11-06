import toHaveNoPa11yViolations from './toHaveNoPa11yViolations';

/* eslint-disable no-unused-vars */
declare global {
  namespace jest {
    interface Matchers<R, T> {
      toHaveNoPa11yViolations(): R;
    }
  }
}
/* eslint-enable no-unused-vars */

expect.extend({ toHaveNoPa11yViolations });
