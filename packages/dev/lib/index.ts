import * as execa from 'execa'
import { memoize } from 'lodash'

const exec = args => () => execa.shellSync(args).stdout
const mexec = memoize(exec)

export const gitRoot = mexec(`
  git rev-parse --show-toplevel
`)

export const gitShortHash = mexec(`
  git rev-parse --short HEAD
`)
