import * as moment from 'moment'
import { argv } from 'yargs'
import { env, util } from './helper'

// ============================================================================
// Default Configuration
// ============================================================================

export const dir = {
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

const EXTRAS: IEnvGlobals = {
  __DEV__: env.isDev(),
  __PROD__: env.isProd(),
  __TEST__: env.isTest(),
  __COVERAGE__: !argv.watch && env.isTest(),
  __VERSION__: JSON.stringify(require(dir.packageJSON).version),
  __BUILD_DATE__: JSON.stringify(moment().format('YYYYHmmss'))
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

export const webpack = {}

// ============================================================================
// Loader configuration
// ============================================================================

export const EXCLUDE = /(node_modules|bower_components|dist|public)/

export let loaders: { [key: string]: any } = {}

loaders.typescript = {
  test: /\.tsx?$/,
  exclude: EXCLUDE,
  loaders: [
    // Babel is enabled via tsconfig.json
    // { awesomeTypescriptLoaderOptions.useBabel = true }
    // See .babelrc for plugins & presets
    'awesome-typescript-loader'
  ]
}

loaders.babel = {
  test: /\.jsx?$/,
  exclude: EXCLUDE,
  loader: 'babel-loader'
}

loaders.css = {
  test: /\.css$/,
  exclude: EXCLUDE,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader', options: { importLoaders: true } },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => {
          return [
            require('postcss-easy-import')(),
            require('postcss-cssnext')({
              features: {
                autoprefixer: { browsers: ['last 2 versions'], cascade: false }
              }
            })
          ]
        }
      }
    }
  ]
}

loaders.base64InlineLoader = {
  test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  exclude: EXCLUDE,
  loader: 'base64-inline-loader?limit=9999999&name=[name].[ext]'
}

loaders.svg = {
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  exclude: EXCLUDE,
  loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
}

loaders.git = {
  test: /\.gif/,
  exclude: EXCLUDE,
  loader: 'url-loader?limit=10000&mimetype=image/gif'
}

loaders.jpg = {
  test: /\.jpg/,
  exclude: EXCLUDE,
  loader: 'url-loader?limit=10000&mimetype=image/jpg'
}

loaders.png = {
  test: /\.png/,
  exclude: EXCLUDE,
  loader: 'url-loader?limit=10000&mimetype=image/png'
}
// tslint:disable-next-line:no-default-export
