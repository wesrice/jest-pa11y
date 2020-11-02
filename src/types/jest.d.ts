/* eslint-disable no-unused-vars */

declare namespace jest {
  interface Matchers<R, T> {
    toHaveNoPa11yViolations(): R;
  }
}
