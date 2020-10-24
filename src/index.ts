import axeCore, { AxeResults, Result, RunOptions, Spec } from 'axe-core'
import merge from 'lodash.merge'
import chalk from 'chalk'
import { printReceived, matcherHint } from 'jest-matcher-utils'

const mount = (html: HTMLElement | string) : [HTMLElement, () => void] => {
  if (isHTMLElement(html)) {
    if (document.body.contains(html)) {
      return [html, () => undefined]
    }

    html = html.outerHTML
  }

  if (isHTMLString(html)) {
    const originalHTML = document.body.innerHTML
    const restore = () => {
      document.body.innerHTML = originalHTML
    }

    document.body.innerHTML = html
    return [document.body, restore]
  }

  if (typeof html === 'string') {
    throw new Error(`html parameter ("${html}") has no elements`)
  }

  throw new Error(`html parameter should be an HTML string or an HTML element`)
}
interface Options extends RunOptions {
  globalOptions?: Spec;
}

export function configureAxe (
  options: Options = {}
) : (
  html: any, additionalOptions?: {}
) => Promise<AxeResults> {
  const { globalOptions = {}, ...runnerOptions } = options

  axeCore.configure(globalOptions)

  return function axe(html, additionalOptions = {}) {
    const [element, restore] = mount(html)
    const options = merge({}, runnerOptions, additionalOptions)

    return new Promise((resolve, reject) => {
      axeCore.run(element, options, (err, results) => {
        restore()
        if (err) reject(err)
        resolve(results)
      })
    })
  }
}

const isHTMLElement = (
  html: HTMLElement | string
): html is HTMLElement => !!html
  && typeof html === 'object'
  && typeof html.tagName === 'string'

const isHTMLString = (
  html: HTMLElement | string
): html is string => typeof html === 'string' && /(<([^>]+)>)/i.test(html)

export interface AssertionsResult {
  actual: Result[];
  message(): string;
  pass: boolean;
}

export const toHaveNoViolations = (results: Partial<AxeResults>) : AssertionsResult => {
  const violations = results.violations

  if (typeof violations === 'undefined') {
    throw new Error('No violations found in aXe results object')
  }

  const reporter = (violations: Result[]) => {
    if (violations.length === 0) {
      return []
    }

    const lineBreak = '\n\n'
    const horizontalLine = '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500'

    return violations.map(violation => {
      const errorBody = violation.nodes.map(node => {
        const selector = node.target.join(', ')
        const expectedText = `Expected the HTML found at $('${selector}') to have no violations:` + lineBreak
        return (
          expectedText +
          chalk.grey(node.html) +
          lineBreak +
          `Received:` +
          lineBreak +
          printReceived(`${violation.help} (${violation.id})`) +
          lineBreak +
          chalk.yellow(node.failureSummary) +
          lineBreak + (
            violation.helpUrl ?
            `You can find more information on this issue here: \n${chalk.blue(violation.helpUrl)}` :
            ''
          )

        )
      }).join(lineBreak)

      return (errorBody)
    }).join(lineBreak + horizontalLine + lineBreak)
  }

  const formatedViolations = reporter(violations)
  const pass = formatedViolations.length === 0

  const message = () => {
    if (pass) {
      return ''
    }
    return matcherHint('.toHaveNoViolations') +
          '\n\n' +
          `${formatedViolations}`
  }

  return { actual: violations, message, pass }
}

export const axe = configureAxe();
