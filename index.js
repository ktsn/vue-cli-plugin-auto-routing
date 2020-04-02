const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')

const defaultOptions = {
  pages: 'src/pages',
  nested: true,
}

module.exports = (api, options) => {
  const pluginOptions = {
    ...defaultOptions,
    ...(options.pluginOptions && options.pluginOptions.autoRouting),
  }

  api.chainWebpack((webpackConfig) => {
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
