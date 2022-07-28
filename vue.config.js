module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  },
  devServer: {
    proxy: 'http://localhost:8888',
  },
  productionSourceMap: false,
  transpileDependencies: [
    'vuetify'
  ]
}
