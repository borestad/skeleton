import * as memoize from 'lodash/memoize'
import * as path from 'path'

// ============================================================================
// Private Helpers
// ============================================================================
const isValidEnv = env => {
  if (!env || !/^(development|production|test)$/.test(env)) {
    throw new Error('Missing valid NODE_ENV argument (dev|prod|test)')
  }
  return true
}

// ============================================================================
// Generic Utility Helper
// ============================================================================
export const util: { [k: string]: any } = {}

util.resolve = memoize(relativePath => {
  return path.resolve(path.resolve(process.cwd()), relativePath)
})

// ============================================================================
// Environment Helpers
// ============================================================================
const NODE_ENV: string = process.env.NODE_ENV || ''

const isEnv = env => isValidEnv(env) && env === NODE_ENV
const isProd = () => isEnv('production')
const isDev = () => isEnv('development')
const isTest = () => isEnv('test')

export const env = {
  NODE_ENV,
  isEnv,
  isProd,
  isDev,
  isTest
}
