module.exports = function(api) {
  api.cache(true)
  return {
    presets: [
      [
	'@babel/preset-env', {
	  targets: {
	    node: 'current'
	  }
	}
      ],
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ],
    ignore: [
      '**/*.stories.js',
      '**/*.stories.jsx',
      '**/*.test.js',
      '**/*.test.jsx',
      'setup-tests.js'
    ]
  }
}
