const customFunc = require('../webpack.config')

module.exports = async ({config, mode}) => {
  const custom = customFunc(null, {mode: 'development'})
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        custom.module.rules[0],
        ...config.module.rules,
      ]
    },
    resolve: {
      ...config.resolve,
      ...custom.resolve
    },
    plugins: [
      ...config.plugins,
      ...custom.plugins
    ]
  }
}
