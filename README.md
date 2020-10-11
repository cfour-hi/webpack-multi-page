# webpack-multi-page

> 基于 webpack v4 的前端多页项目工程，适用于展示型站点，比如官网。

## 特性

- 支持 ES6+ 语法，使用 babel 编译，预设 [preset-env](https://babeljs.io/docs/plugins/preset-env/)；

- html 支持 [ejs](http://ejs.co/) 语法，使用 [underscore-template-loader](https://github.com/emaphp/underscore-template-loader) 和 [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) 编译，详细语法可查看 [underscore](http://underscorejs.org/#template) 或者 [lodash](https://lodash.com/docs/4.17.4#template) `_.template` 函数部分。另外 underscore-template-loader 提供 [Macros (宏)](https://github.com/emaphp/underscore-template-loader#macros) 的特性可自定义静态内容，内置 _require_ 宏可在页面 html 文件内引入公共 html 组件，比如 header、footer 之类多页面公共组件，并且可以提供参数给组件；

- 已内置第三方 css 库 `normalize.css@^8.0.1` 和 js 库 `jquery@^3.5.1` 可全局使用，无需声明引入；

- html、css、js 文件内资源引用全部使用相对路径并且会自动判断是否转为 base64 格式；

- 支持 css autoprefixer，无需手写浏览器兼容；支持 css @import 语法；

- 打包采用内容 hash，文件内容未改变情况下多次打包不会修改文件名中的 hash 值；

- 无需手动添加页面 webpack entry，只需按照 pages 目录结构添加页面即可；

## 页面目录结构

```
|-- pages/                        -- 源文件
|   |-- index.html                  -- 主页面
|   |-- index.css
|   |-- index.js
|   |-- page-a/                     -- page-a 页面
|       |-- index.html
|       |-- index.css
|       |-- index.js
|       |-- sub-page-a                  -- page-a 子页面
|           |-- index.html
|           |-- index.css
|           |-- index.js
|   ... (more like page-a)
```

## 建议

- 打包之后的文件目录是有讲究的，除 .html 之外的资源，全部放在 dist/assets 目录下；

  （可选）打包前将 webpack.conf/utils/constant.js `assetsPublicPath` 的值修改为 CDN 地址，打包后可将 dist/assets 目录直接放到 CDN。

## 使用

[下载项目](https://codeload.github.com/znlbwo/webpack-multi-page/zip/master)

```
# 安装依赖
  yarn

# 本地开发
  npm run serve

# 打包构建
  npm run build
```

## LICENSE

MIT
