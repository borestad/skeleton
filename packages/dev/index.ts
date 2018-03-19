import * as _lib from './lib'
import _webpackDev from './webpack/config/config.webpack.dev'
import _webpackProd from './webpack/config/config.webpack.prod'

const NODE_ENV = process.env.NODE_ENV

if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  )
}

export const lib = _lib

export const webpack =
  process.env.NODE_ENV === 'production' ? _webpackProd : _webpackDev
