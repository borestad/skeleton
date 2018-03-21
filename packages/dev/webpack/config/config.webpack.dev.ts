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
      libraryTarget: 'umd',
      filename: `[name].[hash:8].js`,
      chunkFilename: '[name].[chunkhash:8].chunk.js'
    },

    entry: {
      client: [...hotReload, 'babel-regenerator-runtime', './index.ts']
    },

    devtool: 'source-map',

    // optimization: {
    // runtimeChunk: true
    // splitChunks: {
    //   chunks: 'all',
    //   minSize: 0,
    //   maxAsyncRequests: Infinity,
    //   maxInitialRequests: Infinity,
    //   name: true,
    //   cacheGroups: {
    //     default: {
    //       chunks: 'async',
    //       minSize: 30000,
    //       minChunks: 2,
    //       maxAsyncRequests: 5,
    //       maxInitialRequests: 3,
    //       priority: -20,
    //       reuseExistingChunk: true
    //     },
    //     vendors: {
    //       name: 'vendors',
    //       enforce: true,
    //       test ({ resource }) {
    //         return /node_modules/.test(resource)
    //       },
    //       priority: -10,
    //       reuseExistingChunk: true
    //     },
    //     commons: {
    //       name: 'commons',
    //       chunks: 'initial',
    //       minChunks: 2,
    //       test ({ resource }) {
    //         return !/node_modules/.test(resource)
    //       },
    //       priority: -5,
    //       reuseExistingChunk: true
    //     }
    //   }
    // }
    // },

    plugins: [
      // prints more readable module names in the browser console on HMR updates

      new webpack.NamedModulesPlugin(),

      // do not emit compiled assets that include errors
      new webpack.NoEmitOnErrorsPlugin()
      // Display webpack build progress in Studio Code / macOS Menu Bar.
      // new BitBarWebpackProgressPlugin(),

      // new WebpackBuildNotifierPlugin({
      //   title: 'Webpack Build',
      //   suppressSuccess: true
      // })
    ]
  })
