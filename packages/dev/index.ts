import * as _lib from './lib'

const NODE_ENV = process.env.NODE_ENV

if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  )
}

export const lib = _lib

export const webpack =
  process.env.NODE_ENV === 'production'
    ? require('./webpack/config/config.webpack.prod').default
    : require('./webpack/config/config.webpack.dev').default
