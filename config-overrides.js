const { override, addLessLoader, fixBabelImports } = require('customize-cra');

module.exports = override(
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: 'css',
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    }
  })
)
