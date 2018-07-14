module.exports = api => {
  api.extendPackage({
    dependencies: {
      'vue-router-layout': '^0.1.2'
    },
    devDependencies: {
      'vue-auto-routing': '^0.1.1'
    }
  })

  api.render('./template')

  if (api.invoking) {
    api.postProcessFiles(files => {
      files.forEach(file => {
        if (/^src\/views[/$]/.test(file)) {
          delete files[file]
        }
      })
    })

    if (api.hasPlugin('typescript')) {
      api.postProcessFiles(files => {
        delete files['src/router.ts']
      })

      const convertFiles = require('@vue/cli-plugin-typescript/generator/convert')
      convertFiles(api)
    }
  }
}
