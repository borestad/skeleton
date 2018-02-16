import * as CompressionPlugin from 'compression-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as webpack from 'webpack'
import * as WebpackCleanupPlugin from 'webpack-cleanup-plugin'
import * as merge from 'webpack-merge'
import { StatsWriterPlugin } from 'webpack-stats-plugin'
import * as config from './config'
import base from './config.webpack.base'

// tslint:disable-next-line:no-default-export
export default () => {
  return merge.smart(base(), {
    entry: {
      client: './index.ts'
    },

    devtool: 'source-map',

    output: {
      publicPath: './',
      path: config.dir.dist,
      filename: 'index.js',
      libraryTarget: 'umd'
    },

    performance: {
      maxAssetSize: 1000 * 1000,
      maxEntrypointSize: 1000 * 1000,
      hints: 'warning'
    },

    plugins: [
      new StatsWriterPlugin(),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|html)$/,
        threshold: 0,
        minRatio: 0.8
      }),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
          __PROD__: true,
          __DEV__: false
        }
      }),

      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor',
      //   minChunks: module => /node_modules|\.css/.test(module.resource)
      // }),

      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          drop_debugger: true
        },
        sourceMap: true
      }),

      new webpack.optimize.OccurrenceOrderPlugin(true),

      new ExtractTextPlugin({
        filename: 'index.css',
        allChunks: true
      }),

      new WebpackCleanupPlugin()
    ]
  })
}
