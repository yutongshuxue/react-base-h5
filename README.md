# 1 项目安装

    npx create-react-app

# 2 暴露 webpack 配置文件

    npm run eject

# 3 移动端适配

## 1 安装 postcss-px-to-viewport

    npm i postcss-px-to-viewport

## 2 在 webpack.config.js

    const px2toviewport = require('postcss-px-to-viewport')

    postcssOptions: {
            // Necessary for external CSS imports to work
            // https://github.com/facebook/create-react-app/issues/2677
            ident: 'postcss',
            config: false,
            plugins: !useTailwind
              ? [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  px2toviewport({ viewportWidth:750 }), //主要加入这里,如果你写的是750，就把设计稿设置成750来量，如果写375，就改成375来量
                  // Adds PostCSS Normalize as the reset css with default options,
                  // so that it honors browserslist config in package.json
                  // which in turn let's users customize the target behavior as per their needs.
                  'postcss-normalize',
                ]
              : [
                  'tailwindcss',
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],

                ],
          },

## 3 样式重置

    在index.html中引入

      <link rel="stylesheet" href="%PUBLIC_URL%/reset.css">

## 4 添加 sass 支持

    npm install sass -D

## 5 antd mobile 的支持

    npm install --save antd-mobile

    import { Button } from 'antd-mobile'

    就可以使用了


    1 安装

      babel-plugin-import react-app-rewired customize-cra less less-loader

    2 修改package.json中的启动命令(修改了命令导致原来在webconfig中配置的px2vw失效，为此我放弃了按需加载，mobile5.0已经支持tree shaking了，所有体积不会很大。)

      "scripts": {
          "start": "react-app-rewired start",
          "build": "react-app-rewired build",
          "test": "node scripts/test.js"
        },

    3 建立 config-overrides.js文件

      const {
          override,
          fixBabelImports,
      } = require("customize-cra");


      module.exports = override(
          fixBabelImports("import", {
              libraryName: "antd", libraryDirectory: "es", style: 'css' // change importing css to less
          }),
      );

    启动 最后你发现，原来在webpage.config.js配置的px-vw失效了。头大。。

    所有不能外部配置，并想通过改变启动命令来覆盖webpack.config.js的配置来实现。还是得在eject暴露的webconfing.js中配置

      在webpack.config.js中全局搜索test: /\.(js|mjs|jsx|ts|tsx)$/,并在plugins的数组最后加入

        ["import", { libraryName: "antd", style: "css"}]来实现。这样原来的px2toviewport还是有效的.

        记住启动命令还是node scripts/start.js不要改变

## 6 别名配置

    1 在webpage.config.js中配置

      const resolvePath = relativePath => path.resolve(process.cwd(), relativePath);

      全局搜索alias

        alias:{
          ...
          '@': resolvePath('src'),
          '@c': resolvePath('src/components'),
          '@a': resolvePath('src/assets'),
        }

    根目录建立jsconfig.json文件 -- 让vscode认识@符号

      {
        "compilerOptions": {
          "baseUrl": "./",
          "paths": {
            "@/*":["src/*"],
            "@s":["src/assets/styles/*"],
            "@c":["src/components/*"]
          }
        }
      }

    关闭vscode并重启项目

    所有原先config-overrides.js文件不要也罢，该文件是如果你的启动命令是react-app-rewired start,会用你的配置覆盖webconfig.js的配置，但是里面配置的px2toviewport无效了。可以删掉，也可留着，启动命令node scripts/start.js会去找webpack里面的配置。

    到这里，我们reset了样式，配置了px2toviewport 配置了antd-mobile的按需引用 配置了目录别名 继续往下

## 7 配置路由

    npm i react-router-dom@5.x

    在App.js中
      import React, { Fragment,Suspense } from 'react'
      import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

      import Home from './pages/home';
      const Login = React.lazy(() => import('./pages/login'))

      function App() {
        return (
          <Fragment>
            <Router>
              <Suspense fallback='loading...'>
                <Switch>
                  <Redirect  exact from='/' to='/home' component={Home}></Redirect>
                  <Route path='/home' component={Home}></Route>
                  <Route path='/login' component={Login}></Route>
                </Switch>
              </Suspense>
            </Router>
          </Fragment>
        );
      }

      export default App;
