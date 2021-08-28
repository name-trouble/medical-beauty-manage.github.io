import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import '@/config/prototype' //原型扩展 方法
import ElementUI from 'element-ui'
import '@/style/selfCommon.less'
import '@/api/myData'
// import 'babel-polyfill'
// import 'element-ui/lib/theme-chalk/index.css'

import { setCookie } from '@/config/mUtils'
Vue.config.productionTip = false

Vue.use(ElementUI)

window.onbeforeunload = function(event) {
    setCookie('isReload', 'xmxloadpage', 10)
}

import Vuex from 'vuex'

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
