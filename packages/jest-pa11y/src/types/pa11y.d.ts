/* eslint-disable no-unused-vars */
import pa11y from 'pa11y';

declare module 'pa11y' {
  interface ResultIssue {
    code: string;
    context: string;
    message: string;
    runner: 'axe' | 'htmlcs';
    runnerExtras?: any;
    selector: string;
    type: 'error' | 'notice' | 'warning';
    typeCode: number;
  }

  interface AxeResultIssue extends ResultIssue {
    runner: 'axe';
    runnerExtras: {
      description: string;
      impact: string;
      help: string;
      helpUrl: string;
    };
  }

  interface HtmlcsResultIssue extends ResultIssue {
    runner: 'htmlcs';
  }

  interface Results {
    documentTitle: string;
    pageUrl: string;
    issues: ResultIssue[];
  }
}
