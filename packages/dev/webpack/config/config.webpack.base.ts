import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as webpack from 'webpack'
import * as config from './config'
import { loaders } from './config.loaders'
import { env, util } from './helper'

// tslint:disable-next-line:no-default-export
export default () => {
  let cfg: webpack.Configuration = {}

  cfg.target = 'web'

  cfg.performance = {
    hints: env.isProd() ? 'warning' : false
  }
  cfg.bail = true

  cfg.output = {
    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/',
    path: config.paths.dist,
    filename: 'index.js',
    library: 'Package'
  }

  cfg.resolve = {
    extensions: [
      '.mjs',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.web.js',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx',
      '.css'
    ]
  }

  cfg.module = {
    rules: Object.values(loaders)
  }

  cfg.devServer = {
    quiet: false,
    contentBase: config.paths.dist,
    // do not print bundle build stats
    noInfo: false,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: config.server.PORT,
    host: config.server.HOST,
    disableHostCheck: true,
    compress: false,
    overlay: {
      warnings: true,
      errors: true
    }
  }
  cfg.stats = 'errors-only'

  cfg.plugins = [
    new webpack.DefinePlugin(config.globals),

    new HtmlWebpackPlugin({
      template: util.resolve('index.html'),
      inject: 'head',
      files: {
        js: ['index.js']
      },
      minify: env.isProd() && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
  // https://webpack.js.org/configuration/stats/
  cfg.stats = {}

  return cfg
}
