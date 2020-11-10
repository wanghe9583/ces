import Vue from 'vue'
import App from './App'

import store from './store'
import request from './common/request.js' 
import msg from './common/msg.js';
import uView from "uview-ui";

Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = request;
Vue.prototype.$msg=msg;

App.mpType = 'app'
// Vue.use(weekSlider)
const app = new Vue({
	store,
	...App
})
app.$mount()