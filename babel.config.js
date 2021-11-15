const consolePlugins = []
if (process.env.NODE_ENV === 'production') {
  consolePlugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ...consolePlugins,
    ["import",
      {
        "libraryName": "Vant",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
