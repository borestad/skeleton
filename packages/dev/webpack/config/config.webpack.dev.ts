import * as webpack from 'webpack'
import * as Jarvis from 'webpack-jarvis'
import * as merge from 'webpack-merge'
import base from './config.webpack.base'

const useHotReload = process.env.HOT_RELOAD === '1'
const hotReload = useHotReload
  ? [
      // activate HMR for React
      // 'react-hot-loader/patch',

      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack-dev-server/client?http://localhost:8888',

      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server'
    ]
  : []

// tslint:disable-next-line:no-default-export
export default () =>
  merge.smart(base(), {
    output: {
      libraryTarget: 'umd'
    },
    entry: {
      client: [...hotReload, 'babel-regenerator-runtime', './index.ts']
    },

    devtool: 'inline-source-map',

    plugins: [
      // enable HMR globally
      new webpack.HotModuleReplacementPlugin(),

      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),

      // do not emit compiled assets that include errors
      new webpack.NoEmitOnErrorsPlugin(),

      new Jarvis({
        port: 1337
      })
    ]
  })
