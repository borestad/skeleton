import { TsConfigPathsPlugin } from 'awesome-typescript-loader'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as webpack from 'webpack'
import * as config from './config'
import { util } from './helper'

// tslint:disable-next-line:no-default-export
export default () => {
  let cfg: webpack.Configuration = {}

  cfg.target = 'web'

  cfg.bail = true

  cfg.output = {
    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/',
    path: config.dir.dist,
    filename: 'index.js',
    library: 'Package'
  }

  cfg.resolve = {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
  }

  cfg.module = {
    rules: Object.values(config.loaders)
  }

  cfg.devServer = {
    quiet: false,
    contentBase: config.dir.dist,
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
      }
    }),

    new TsConfigPathsPlugin()
  ]
  // https://webpack.js.org/configuration/stats/
  cfg.stats = {}

  return cfg
}
