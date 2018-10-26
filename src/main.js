import Vue from 'vue'
import App from './App'
import store from './store'
import {api} from './request/api'
import './less/reset.less'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api
App.mpType = 'app'

const app = new Vue({App})
app.$mount()
