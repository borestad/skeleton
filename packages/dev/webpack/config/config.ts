import * as moment from 'moment'
import { argv } from 'yargs'
import { gitRoot, gitShortHash } from '../../lib/index'
import { env, util } from './helper'

// ============================================================================
// Default Configuration
// ============================================================================

export const paths = {
  gitRoot: gitRoot(),
  root: util.resolve(''),
  config: util.resolve('config'),
  dist: util.resolve('dist'),
  src: util.resolve('src'),
  nodeModules: util.resolve('node_modules'),
  packageJSON: util.resolve('package.json')
}

// ============================================================================
// Global Environment
// ============================================================================

export const EXTRAS: IEnvGlobals = {
  __DEV__: env.isDev(),
  __PROD__: env.isProd(),
  __TEST__: env.isTest(),
  __COVERAGE__: !argv.watch && env.isTest(),
  __VERSION__: JSON.stringify(require(paths.packageJSON).version),
  __BUILD_DATE__: moment().format('YYYYMMDD-HHmmss'),
  __GITHASH__: gitShortHash()
}

export const globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(env.NODE_ENV),
    ...EXTRAS
  }
}

// ============================================================================
// Server Configuration
// ============================================================================

export const server = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || '8888'
  // server_host : ip.address(),
  // server_port : process.env.PORT || 3000
}
