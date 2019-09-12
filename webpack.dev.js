const webpack =require('webpack')
const path = require('path')
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const config = {
	//模式
	mode: "development",   //development, production
	devtool: "eval-source-map",
	//devServer
	devServer:{
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,  //一切服务都启用gzip 压缩
		host: "0.0.0.0",  //localhost或者ip访问
		port: "9999",  //端口
		hot: false,  //模块热替换
		hotOnly: true, 
		inline:true,  //
		noInfo: true,  //「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
		historyApiFallback: true  //使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
	},
	plugins:[
	    new webpack.HotModuleReplacementPlugin(),//模块热替换插件     HMR --hot
	],
}

module.exports = merge(config, common);