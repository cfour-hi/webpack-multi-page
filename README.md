# webpack-multi-page

webpack 前端多页项目工程，适用于展示型站点，比如官网。

## Example

[Demo](https://monine.github.io/webpack-multi-page/dist/)

## Feature

- 支持 ES6 语法，使用 babel 编译，预设 `env` 环境 - [preset-env](https://babeljs.io/docs/plugins/preset-env/)

- html 支持 [ejs](http://ejs.co/) 语法，使用 [underscore-template-loader](https://github.com/emaphp/underscore-template-loader) 和 [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) 编译，详细语法可查看 [underscore](http://underscorejs.org/#template) 或者 [lodash](https://lodash.com/docs/4.17.4#template) `_.template` 函数部分。另外 underscore-template-loader 提供 [Macros (宏)](https://github.com/emaphp/underscore-template-loader#macros) 的特性可自定义静态内容，内置 *require* 宏可在页面 html 文件内引入公共 html 组件，比如 header、footer 之类多页面公共组件，并且可以提供参数给组件。

- 已内置第三方 css 库 - normalize.css@^7.0.0 和 js 库 - jquery@^3.2.1 可全局使用，无需声明引入，添加或删除可自行修改配置文件 `build/webpack.base.config.js` 。

- html、css、js 文件内资源引用全部使用相对路径并且会自动判断是否转为 base64 格式

- 支持 css autoprefixer `browserslist: ["> 1%, "last 2 versions"]`，无需手写浏览器兼容；支持 @import 特性，由 css-loader 处理。

- 打包采用内容 hash，文件内容未改变情况下多次打包不会修改文件名中的 hash 值。

- 无需手动添加页面 webpack entry，只需按照目录结构添加页面即可。

详细内容可参考此文章 [基于 webpack 的前端多页工程](https://monine.github.io/#/article/21) ✨

## Node

请务必遵循如下页面结构

  ``` base
  |-- src/                        -- 源文件
  |   |-- index.html                  -- 主页面
  |   |-- index/                      -- 主页面资源
  |       |-- index.css
  |       |-- index.js
  |       |-- img/
  |   |-- page-a/                     -- page-a 页面
  |       |-- index.html
  |       |-- index.css
  |       |-- index.js
  |       |-- img/
  |       |-- sub-page-a                  -- page-a 子页面
  |           |-- index.html
  |           |-- index.css
  |           |-- index.js
  |           |-- img/
  |   ... (more like page-a)
  ```

  除主页面把 index.html 放在 src 根目录下，其它页面和子页面结构都保持一致。

  ~~:zap: **每新增一个页面都需要在 `config/entries.js` 内添加对应的页面入口路径**~~

  运行和打包会自动遍历除首页之外的所有页面，添加页面对应 webpack 入口配置，无需手动添加。默认文件名为 index，如需修改，可在 `config/entries.js` 内配置对应目录路径和名称。

## Tips

- 项目如需使用第三方 CDN 资源，可参考 [Webpack Externals](https://doc.webpack-china.org/configuration/externals/) 配置，在 `build/webpack.prod.config.js` 也有 jquery 示例（已被注释）。与此同时，html 文件也需要添加对应的资源引用，不过开发环境建议使用 npm 包，在 package.json 中明确项目依赖使项目更加清晰，便于移植和协作。

  ``` html
  <head>
    ...
    <% if (htmlWebpackPlugin.options.env === 'testing') { %>
      <link href="//cdn.bootcss.com/normalize/7.0.0/normalize.css" rel="stylesheet">
    <% } else if (htmlWebpackPlugin.options.env === 'production') { %>
      <link href="//cdn.bootcss.com/normalize/7.0.0/normalize.min.css" rel="stylesheet">
    <% } %>
  </head>

  <body>
    ...
    <% if (htmlWebpackPlugin.options.env === 'testing') { %>
      <script src="//cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
    <% } else if (htmlWebpackPlugin.options.env === 'production') { %>
      <script src="//cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <% } %>
  </body>
  ```

## Usage

### Install

`git clone git@github.com:monine/webpack-multi-page.git`

or

`git clone https://github.com/Monine/webpack-multi-page.git`

or

[download](https://codeload.github.com/Monine/webpack-multi-page/zip/master)

### Build Setup

``` base
# install dependencies
  npm install

# serve with hot reload at localhost:8080
  npm run dev

# build for testing without minification
  npm run testing

# build for production with minification
  npm run build
```

## LICENSE

MIT
