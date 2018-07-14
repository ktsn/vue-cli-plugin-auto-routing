const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')

module.exports = api => {
  api.chainWebpack(webpackConfig => {
    // prettier-ignore
    webpackConfig
      .plugin('vue-auto-routing')
        .use(VueAutoRoutingPlugin, {
          pages: 'src/pages'
        })
  })
}
