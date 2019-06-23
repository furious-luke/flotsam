/* eslint-disable */

const webpack = require('webpack')
const path = require('path')
const finder = require('find-package-json')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

function configure(env) {
  const OUTPUT = path.resolve((env && env.output) || './dist')

  let config = {
    mode: 'development',
    target: 'web',
    entry: [
      './src/index'
    ],
    output: {
      path: OUTPUT,
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [__dirname],
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: [
            {loader: 'style-loader'},
            {loader: 'css-loader'}
          ]
        },
        {
          test: /\.(svg|png|jpe?g$)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        },
        {
          test: /\.(ttf|eot|woff|woff2)(\?=\d+)?$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        }
      ]
    },
    resolve: {
      mainFields: ['browser', 'module', 'main'],
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules')
      ],
      alias: {
        tidbits: path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      new PeerDepsExternalsPlugin()
    ]
  }

  if (env && env.production) {
    config.output.filename = 'index.js'
    config.plugins = config.plugins.concat([
      new webpack.HashedModuleIdsPlugin(),
      new CleanWebpackPlugin(
        [config.output.path]  // TODO: This is borked.
      ),
      new CompressionPlugin({
        test: /\.js$|\.css$|\.html$/,
        minRatio: Number.MAX_SAFE_INTEGER
      })
    ])
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6,
            pure_funcs: [
              'console.debug'
            ]
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
  }
  else if (env && env.hmr) {
    config.plugins = config.plugins.concat([
      new HtmlWebpackPlugin({
        title: 'Coucou!'
      })
    ])
    config.output.publicPath = '/'
    config.devServer = {
      host: env.host || '0.0.0.0',
      port: 3000,
      hot: true,
      historyApiFallback: true,
      proxy: [
        {
          context: ['/api'],
          target: `http://${env.proxyTarget || process.env.PROXY_TARGET || 'localhost'}:8000`,
          secure: false
        },
        {
          context: ['/graphql'],
          target: `http://${env.proxyTarget || process.env.PROXY_TARGET || 'localhost'}:8000`,
          secure: false
        }
      ],
      disableHostCheck: true  // needed for end-to-end tests
    }
  }

  return config
}

module.exports = configure
