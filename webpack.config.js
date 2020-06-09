const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  const {
    hmr,
    environment,
    mode,
    release
  } = argv
  const config = (
    !release
      ? (
        hmr
          ? getHmrConfig(mode)
          : getDevelopmentConfig(mode)
      )
      : getProductionConfig(mode)
  )
  return config
}

function getHmrConfig(mode) {
  const config = getDevelopmentConfig(mode)
  return {
    ...config,
    entry: ['react-hot-loader/patch', './src/index'],
    devServer: {
      host: '0.0.0.0',
      port: 3000,
      publicPath: '/',
      proxy: {
        '/graphql': 'http://localhost:8000/'
      },
      historyApiFallback: true,
      compress: true,
      hot: true
    }
  }
}

function getDevelopmentConfig(mode = 'development') {
  const config = getBaseConfig()
  return {
    ...config,
    entry: './src/index',
    mode,
    devtool: 'eval-source-map',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, './dist'),
      publicPath: '/'
    }
  }
}

function getProductionConfig(mode = 'production') {
  const config = getBaseConfig()
  return {
    ...config,
    entry: './src/index',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, './dist')
    },
    mode,
    optimization: {
      minimizer: [
        new TerserPlugin({
          test: /\.js$/,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            ecma: 6,
            compress: {
              pure_funcs: [
                'console.debug'
              ]
            }
          }
        })
      ]
    }
  }
}

function getBaseConfig() {
  return {
    target: 'web',
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/,
          include: [
            path.resolve(__dirname)
          ],
          exclude: /(node_modules)/,
          use: 'babel-loader',
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|otf|svg)$/,
          loader: 'url-loader?limit=100000',
        }
      ]
    },
    resolve: {
      mainFields: ['browser', 'module', 'main'],
      extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.json'],
      modules: [
        // path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules')
      ],
      alias: {
        flotsam: path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        meta: {
          viewport: 'width=device-width initial-scale=1'
        }
      })
    ]
  }
}
