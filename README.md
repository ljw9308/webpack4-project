## name, chunkhash, id, chunk 

## CleanWebpackPlugin is not a constructor ?
[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional) 插件导出的不在是一个构造函数而是一个对象    
作用：清空某一个文件夹
```javascript
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
```

## extract-text-webpack-plugin
webpack4中已经废弃  (请使用[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)代替)     
作用：将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件


## devServer
host默认是 localhost。如果你希望服务器外部可访问, 指定如下：
```javascript
host: "0.0.0.0"
```
```javascript
devServer:{
	contentBase: path.resolve(__dirname, 'dist'),
	compress: true,  //一切服务都启用gzip 压缩
	host: "0.0.0.0",  //localhost或者ip访问
	port: "9999",  //端口
	hot: true,  //模块热替换
}
```
开发期代理解决跨域请求问题


## cross-env
cross-env能跨平台地设置及使用环境变量	
安装
```
npm i -D cross-env
```
使用
```javascript
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
	"start": "npm run dev",
	"dev": "cross-env NODE_ENV=development node_modules\\.bin\\webpack-dev-server --config=webpack.dev.js",
	"build": "cross-env NODE_ENV=production node_modules\\.bin\\webpack --config=webpack.prod.js"
}
```
DefinePlugin

## 利用friendly-errors-webpack-plugin插件优化日志
```javascript
npm i -D friendly-errors-webpack-plugin
```
```javascript
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

plugins:[
	new FriendlyErrorsWebpackPlugin()
]
```


## webpack-bundle-analyzer 打包分析可视化工具
安装：npm install --save-dev webpack-bundle-analyzer
```javascript
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

plugins:[
	new FriendlyErrorsWebpackPlugin()
]
```
package.json 文件中的配置，默认会打开http://127.0.0.1:8888作为展示
```
"scripts": {
    "analyz": "cross-env NODE_ENV=production npm_config_report=true npm run build"
}
```

## SplitChunksPlugin 代码分离

[参考](https://juejin.im/post/5b99b9cd6fb9a05cff32007a)
[参考](https://juejin.im/post/5af1677c6fb9a07ab508dabb)

## 如何编写一个loader和插件