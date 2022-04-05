import Vue from 'vue'
import App from './App'
import store from '@/store';
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);
Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

// 引入公共函数
import globalFunc from '@/utils/base64.js'
Vue.use(globalFunc, app);

Vue.mixin({
	methods: {
		//去其他页面
		goOtherPage(path, params = {}, animationType = "pop-in") {
			this.$u.route({
				url: path,
				params,
				animationType
			})
		},
	},
});

const app = new Vue({
	store,
	...App
})
app.$mount()
