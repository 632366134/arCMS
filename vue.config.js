const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
let nowTime = new Date().getTime()
console.log(nowTime)
module.exports = {
  publicPath: '',
  lintOnSave: false,
  outputDir: process.env.VUE_APP_OUTPUT,
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  parallel: false,
  filenameHashing: false,
  css: {
    extract: {
      filename: `css/[name].${nowTime}.css`,
      chunkFilename: `css/[name].${nowTime}.css`
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.devtool = false
    }
    config.module.rules.push({
      test: /\.worker\.js$/,
      use: {
        loader: 'worker-loader',
        options: {
          filename: `workerName.js`
          // filename:  process.env.NODE_ENV === 'production' ? '[name].[contenthash].worker.js' : '[name].[contenthash].worker.js'
        }
      }
    })
    Object.assign(config.output, {
      filename: `js/[name].${nowTime}.js`,
      chunkFilename: `js/[name].${nowTime}.js`
    })
    config.plugins.push(
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.json$|\.css/,
        threshold: 10240,
        minRatio: 0.8
      })
    )
    // config.externals = {
    //     'vue': 'Vue',
    //     'element-ui': 'ELEMENT',
    // }
    config.optimization = {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          common: {
            name: 'commons',
            chunks: 'initial',
            minSize: 0,
            minChunks: 2
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1]
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.module.rule('js').exclude.add(/\.worker\.js$/)
    config.output.globalObject('this')
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('@assets', path.join(__dirname, './src/assets'))
  },
  devServer: {
    disableHostCheck: true,
    port: '8081',
    // host: '192.168.1.10',
    proxy: {
      '/': {
        // target: 'http://192.168.1.20:8990/',
        target: 'https://www.arsnowslide.com/',
        // target: 'http://124.70.203.250:8081/',
        // target: 'http://192.168.1.8:8081/',
        // target: 'http://192.168.1.8:8081/',
        changeOrigin: true
      },
      '/wxMiniAppWeb': {
        // target: 'http://192.168.1.20:8992/',
        target: 'https://www.arsnowslide.com/',
        changeOrigin: true
      },
      '/arOpenWeb': {
        target: 'http://192.168.1.20:8993/',
        // target: "https://www.arsnowslide.com/",
        changeOrigin: true
      },
      '/arFileWeb': {
        // target: 'http://192.168.1.20:8994/',
        target: 'http://file.arsnowslide.com/',
        // target: 'http://www.arsnowslide.com/',
        changeOrigin: true
      },
      '/file': {
        target: 'http://192.168.1.20:8770/',
        // target: "https://www.arsnowslide.com/",
        changeOrigin: true,
      }
    }
  }
}
