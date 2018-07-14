module.exports = api => {
  api.extendPackage({
    dependencies: {
      'vue-router-layout': '^0.1.0'
    },
    devDependencies: {
      'vue-auto-routing': '^0.1.0'
    }
  })

  api.render('./template')

  if (api.invoking) {
    api.postProcessFiles(files => {
      Object.keys(files).forEach(file => {
        if (/^src\/views\//.test(file)) {
          delete files[file]
        }
      })
    })

    if (api.hasPlugin('typescript')) {
      const convertFiles = require('@vue/cli-plugin-typescript/generator/convert')
      convertFiles(api)
    }
  }
}
