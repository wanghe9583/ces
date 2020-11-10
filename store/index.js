import Vue from 'vue'
import Vuex from 'vuex'
import $api from '../common/request.js' 
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: true,
		hasLogin: false,
		uerInfo: {},
	},
	mutations: {
		login(state, provider) {
			// console.log('走进了login')
			console.log(provider)
			state.hasLogin = true;
			state.uerInfo = provider;
			uni.setStorage({ //将用户信息保存在本地  
				key: 'uerInfo',
				data: provider
			})
		},
		logout(state) {
			state.uerInfo = {};
			state.hasLogin = false;
			uni.removeStorage({
				key: 'uerInfo'
			})
		}
	}
})

export default store
