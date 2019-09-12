const devMode = process.env.NODE_ENV !== 'production';
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')  //清理 dist 文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin')  //html 插件
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')  //提取css插件
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')  //优化日志插件

// html 文件压缩配置项
const htmlMinifyOption = {
	collapseWhitespace: true,  //合并空格，换行符
    removeComments: true,   //删除注释
    minifyCSS: true,   //压缩HTML中的样式
    minifyJS: true  //压缩HTML中的js
}

const config = {
	//入口
	entry: {
		page1: './src/page1/index.js',
		page2: './src/page2/index.js'
	},
	//出口
	output:{
		path: path.resolve(__dirname, 'dist'),
		publicPath: "/",
		filename: devMode ? '[name]/[name].js' : '[name]/[name].[chunkhash].js',
		chunkFilename: devMode ? 'asyncChunk/[name].asyn.js' : 'asyncChunk/[name].[chunkhash].asyncChunk.js',
	},
	//解析
	resolve:{
		alias: {
			'@': path.resolve(__dirname, 'src')   //src 文件夹变成一个模块，确保模块引入变得更简单
		}
	},
	//外部扩展
	externals:{
		vue: "Vue",
		jquery: 'jQuery'
	},
	//loader
	module:{
		rules:[
			{
				test: /\.css$/,
				use: [
		            {
			            loader: MiniCssExtractPlugin.loader,
			            options: {
			            	hmr: devMode   //热更新   reloadAll: true,
			            },
		            },
		            'css-loader',
//		            'style-loader'
		        ],
			}
		]
	},
	//插件
	plugins:[
	    new CleanWebpackPlugin(),   //清理 dist 文件夹
	    new FriendlyErrorsWebpackPlugin(),  //优化日志插件
	    new MiniCssExtractPlugin({
	        filename: devMode ? '[name].css' : '[name].[contenthash].css',
	        chunkFilename: devMode ? '[id].asyn.css' : '[id].[hash].asyn.css',
	    }),
		new HtmlWebpackPlugin({
			title: "页面page1",
			filename: "page1/index.html",
			template: "./src/page1/index.html",
			chunks: ['page1'],
			minify: devMode ? false : htmlMinifyOption
		}),
		new HtmlWebpackPlugin({
			title: "页面page2",
			filename: "page2/index.html",
			template: "./src/page2/index.html",
			chunks: ['page2'],
			minify: devMode ? false : htmlMinifyOption
		}),
	],
	//SplitChunksPlugin
	optimization: {
	    splitChunks: {
	      chunks: 'async',  //表示哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async
	      minSize: 30000,  //表示在压缩前的最小模块大小，默认为30000
	      minChunks: 1,  //表示被引用次数，默认为1
	      maxAsyncRequests: 5,  //按需加载的代码块（vendor-chunk）并行请求的数量小于或等于5个
	      maxInitialRequests: 3,  //初始加载的代码块，并行请求最大数量应该小于或等于3
	      automaticNameDelimiter: '~',  //命名连接符
	      name: true,  //拆分出来块的名字，默认由块名和hash值自动生成
	      cacheGroups: {  //缓存组
	        vendors: {
	          test: /[\\/]node_modules[\\/]/,
	          priority: -10
	        },
	        default: {
	          minChunks: 2,
	          priority: -20,
	          reuseExistingChunk: true
	        }
	      }
	    }
	 }
}

module.exports = config;
