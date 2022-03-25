const { getPlugin } = require('@craco/craco')
const { whenProd, pluginByName } = require('@craco/craco')
const path = require('path')
module.exports = {
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    configure: (wenpackConfig) => {
      let cdn = {
        js: [],
        css: []
      }
      // 对webpack进行配置
      whenProd(() => {
        // 只会在生产环境执行
        wenpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM',
          redux: 'Redux'
        }

        cdn = {
          js: [
            'https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js',
            'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
            'https://cdn.bootcdn.net/ajax/libs/redux/4.1.0/redux.min.js'
          ],
          css: []
        }
      })
      const { isFound, match } = getPlugin(
        wenpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )
      console.log(match)
      if (isFound) {
        // 找到了html的插件
        match.userOptions.cdn = cdn
      }
      return wenpackConfig
    }
  }
}
