const actual = jest.requireActual('pa11y');
const pa11y = jest.fn((...args) => actual(...args));

export default Object.assign(pa11y, actual);
