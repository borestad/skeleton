import * as _lib from './lib'
import _webpackDev from './webpack/config/config.webpack.dev'
import _webpackProd from './webpack/config/config.webpack.prod'

export const lib = _lib

export const webpack =
  process.env.NODE_ENV === 'production' ? _webpackProd : _webpackDev
