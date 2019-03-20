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
        minSize: 20000,
        maxSize: 70000,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/](proj4|leaflet|proj4leaflet)[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    } else {
      // mutate for development...
    }
  }
}
