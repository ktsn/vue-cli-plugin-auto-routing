const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')

const defaultOptions = {
  pages: 'src/pages',
  nested: true,
}

module.exports = (api, options) => {
  const opts = options.pluginOptions && options.pluginOptions.autoRouting
  const pluginOptions = {
    ...defaultOptions,
    ...opts,
    outFile: (opts && opts.outFile && api.resolve(opts.outFile)) || undefined,
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
        .loader('vue-cli-plugin-auto-routing/route-loader')

    // prettier-ignore
    webpackConfig.module
      .rule('route')
      .post()
      .resourceQuery(/blockType=route/)
      .use('route')
        .loader('vue-cli-plugin-auto-routing/route-loader')
  })
}
