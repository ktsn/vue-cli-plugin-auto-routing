const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')

module.exports = (api, options) => {
  const opts =
    (options.pluginOptions && options.pluginOptions.autoRouting) || {}

  const pluginOptions = {
    pages: 'src/pages',
    nested: true
  }

  if (opts.chunkNamePrefix != null) {
    pluginOptions.chunkNamePrefix = opts.chunkNamePrefix
  }

  api.chainWebpack(webpackConfig => {
    // prettier-ignore
    webpackConfig
      .plugin('vue-auto-routing')
        .use(VueAutoRoutingPlugin, [pluginOptions])

    // prettier-ignore
    webpackConfig.module
      .rule('route-meta')
      .post()
      .resourceQuery(/blockType=route-meta/)
      .use('route-meta')
        .loader('vue-cli-plugin-auto-routing/route-meta-loader')
  })
}
