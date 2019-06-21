import Vue from 'vue'
import Vuex from 'vuex'
import footer_nav from "./model/footer_nav.js"
import cart from "./model/cart.js"
import account from "./model/user.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		loginProvider: "",
		openid: null,
		token:''
	},
	mutations: {
		login(state,token) {
			uni.setStorage({
				key:"hasLogin",
				data:true,
				success(res) {
					state.hasLogin=res.data;
				}
			})
			uni.setStorage({
				key:"token",
				data:token,
				success(res) {
					state.token=res.data;
				}
			})
		},
		logout(state) {
			uni.setStorage({
				key:"hasLogin",
				data:false,
				success(res) {
					state.hasLogin=res.data;
				}
			})
// 			uni.setStorage({
// 				key:"user",
// 				data:{},
// 				success(res) {
// 					
// 				}
// 			})
// 			uni.setStorage({
// 				key:"token",
// 				data:'',
// 				success(res) {
// 					
// 				}
// 			})
			uni.clearStorage({
				key:"user",
			})
			uni.clearStorage({
				key:"token",
			})
			state.hasLogin = false;
			state.openid = null;
			state.token='';
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		getState(state){
			uni.getStorage({
				key:'hasLogin',
				success(res) {
					state.hasLogin=res.data;
				}
			})
		}
	},
	actions: {
		// lazy loading openid
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function () { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	},
	modules:{
		footer_nav,
		cart,
		account
	}
})

export default store
