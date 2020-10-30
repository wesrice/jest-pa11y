import chalk from 'chalk';
import { matcherHint } from 'jest-matcher-utils';
import { Results, ResultIssue } from 'pa11y';
import Table, { Header } from 'tty-table';

const BR = "\n";

export default (results: Results) : any => {
  const { issues } = results;

  if (!issues) {
    return [];
  }

  let header: Header[] = [
    {
      align: 'left',
      // Required property for some reason...
      formatter: (value) => value,
      value: '',
      width: 'auto',
    },
    {
      align: 'left',
      // Required property for some reason...
      formatter: (value) => value,
      value: '',
      width: 100,
    },
  ];

  const formatedViolations = issues.map((issue: ResultIssue) => {
    const table = Table(header, [
      ['Runner', issue.runner],
      ['Type', issue.type],
      ['Code', issue.code],
      ['Selector', issue.selector],
      ['Context', issue.context],
      ['Message', issue.message],
    ]);

    return chalk.gray(table.render());
  });

  const pass = formatedViolations.length === 0;

  const message = () => {
    if (pass) {
      return '';
    }

    return [
      matcherHint('.toHaveNoPa11yViolations'),
      chalk.gray(`${BR}${formatedViolations.length} Pa11y violations:`),
      formatedViolations.join(BR),
    ].join(BR);
  }

  return { actual: issues, message, pass } as any;
}
