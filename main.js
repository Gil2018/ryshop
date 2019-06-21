import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

import util from './common/util.js';
Vue.prototype.util = util

import graceChecker from './common/graceChecker.js';
Vue.prototype.graceChecker = graceChecker

import indoorbuy from './common/indoorbuy.js';
Vue.prototype.indoorbuy = indoorbuy

// import jweixin from './common/jweixin-module.js';
// Vue.prototype.jweixin = jweixin

const app = new Vue({
	store,
    ...App
})
app.$mount()
