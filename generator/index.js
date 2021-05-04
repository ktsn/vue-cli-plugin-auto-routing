/* eslint-disable-next-line no-unused-vars */
module.exports = (api, _options = {}, rootOptions = {}) => {
  const isVue3 = rootOptions.vueVersion === '3'

  api.extendPackage({
    dependencies: {
      'vue-router-layout': isVue3 ? '^0.4.0' : '^0.1.6',
    },
    devDependencies: {
      'vue-auto-routing': '^1.0.0',
    },
    vue: {
      pluginOptions: {
        autoRouting: {
          chunkNamePrefix: 'page-',
        },
      },
    },
  })

  api.render('./template')

  if (isVue3) {
    api.render('./template-vue3')
  }

  if (api.invoking) {
    api.postProcessFiles((files) => {
      Object.keys(files).forEach((name) => {
        if (/^src\/views[/$]/.test(name)) {
          delete files[name]
        }
      })
    })

    if (api.hasPlugin('typescript')) {
      api.postProcessFiles((files) => {
        delete files['src/router.ts']
      })

      const convertFiles = require('@vue/cli-plugin-typescript/generator/convert')
      convertFiles(api)
    }
  }
}
