const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  runtimeCompiler: true,
  configureWebpack: config => {
    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'static'),
          to: path.resolve(__dirname, 'dist/static'),
          ignore: ['.*']
        }
      ])
    )

    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 55000,
        maxSize: 128000,
        cacheGroups: {
          vendorVue: {
            name: 'vue',
            test: /[\\/]node_modules[\\/](.*vue.*)[\\/]/,
            chunks: 'all',
            priority: -10
          },
          vendorVega: {
            name: 'vega',
            test: /[\\/]node_modules[\\/](.*vega.*)[\\/]/,
            chunks: 'all',
            priority: -20
          },
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
            reuseExistingChunk: true,
            priority: -30
          }
        }
      }
    } else {
      // mutate for development...
    }
  }
}
