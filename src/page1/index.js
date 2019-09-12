import '../css/index.css'
if (module.hot) { module.hot.accept(); }

// 异步导入模块
const yibujs = () => import(/* webpackChunkName: "yibu" */ '@/page1/yibu.js')
yibujs()

import jQuery from "jquery"
import vue from "vue"
//import _ from "lodash"
const lodashjs = () => import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
	console.log(_.join(['a', 'b'], '~'))
})


console.log("index.js")