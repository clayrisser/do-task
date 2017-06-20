import path from 'path';
import webpack from 'webpack';

const VERBOSE = process.argv.includes('--verbose') || process.argv.includes('-v');

export default {
  stats: {
    colors: true,
    reasons: VERBOSE,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },
  context: path.resolve(__dirname, '../src/'),
  entry: './runTool.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'runTool.js'
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        include: path.resolve(__dirname, '../src/'),
        loader: 'babel-loader',
        options: JSON.stringify({
          babelrc: false,
          presets: [
            ['es2015', { modules: false }],
            'stage-2',
            'node5'
          ],
          plugins: [
            'transform-async-to-generator',
            'transform-es2015-block-scoping',
            'transform-react-constant-elements',
            'transform-react-inline-elements',
            'transform-runtime'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.js$/,
      minimize: true,
      comments: false,
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
        drop_console: true
      }
    })
  ]
};
