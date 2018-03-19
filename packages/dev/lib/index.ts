import * as execa from 'execa'
import { memoize } from 'lodash'

const gitRevParse = args => () =>
  execa.shellSync(`git rev-parse ${args}`).stdout

export const gitRoot = memoize(gitRevParse('--show-toplevel'))

export const gitShortHash = memoize(gitRevParse('--short HEAD'))
