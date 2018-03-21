import * as BitBarWebpackProgressPlugin from 'bitbar-webpack-progress-plugin'
import * as webpack from 'webpack'
import * as WebpackBuildNotifierPlugin from 'webpack-build-notifier'
import * as merge from 'webpack-merge'
import * as config from './config'
import base from './config.webpack.base'

const useHotReload = process.env.HOT_RELOAD === '1'
const hotReload = useHotReload
  ? [
    // activate HMR for React
    // 'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    `webpack-dev-server/client?http://${config.server.HOST}:${
      config.server.PORT
    }`,

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server'
  ]
  : []

// tslint:disable-next-line:no-default-export
export default () =>
  merge.smart(base(), {
    mode: 'development',

    output: {
      libraryTarget: 'umd'
    },

    entry: {
      client: [...hotReload, 'babel-regenerator-runtime', './index.ts']
    },

    devtool: 'source-map',

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /node_modules/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    plugins: [
      // enable HMR globally
      // new webpack.HotModuleReplacementPlugin(),

      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),

      // do not emit compiled assets that include errors
      new webpack.NoEmitOnErrorsPlugin(),

      // Display webpack build progress in Studio Code / macOS Menu Bar.
      new BitBarWebpackProgressPlugin(),

      new WebpackBuildNotifierPlugin({
        title: 'Webpack Build',
        suppressSuccess: true
      })
    ]
  })
