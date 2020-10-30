import runPa11y from './runPa11y';

export default (
  configurationOptions: any = {}
) => (html: string | Element, additionalOptions = {})  => runPa11y(
  html,
  {
    ...configurationOptions,
    ...additionalOptions
  }
);
