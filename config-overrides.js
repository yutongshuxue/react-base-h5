
const {
    override,
    fixBabelImports,
    addWebpackAlias,
    addBabelPlugins
} = require("customize-cra");
const path = require('path')
const px2toviewport = require('postcss-px-to-viewport')

const antdImport = fixBabelImports("import", {
        libraryName: "antd", libraryDirectory: "es", style: 'css' // change importing css to less
    })

const alias = addWebpackAlias({
        '@':path.join(__dirname,'src'),
        '@a':path.join(__dirname,'src/assets'),
        '@c':path.join(__dirname,'src/components')
      })

const postcssPlugin = addBabelPlugins([px2toviewport({viewportWidth:750})])

module.exports = override(antdImport,alias,postcssPlugin);