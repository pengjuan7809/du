// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import store from './store'
import './style/common.scss'
import axios from 'axios'
// import './config/rem'
import { AlertPlugin, ToastPlugin,ConfirmPlugin,LoadingPlugin  } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

// import Toast from '@/toast.js'
import Toast from './toast.js'
Vue.use(Toast,{
	duration:5000
});


FastClick.attach(document.body)

Vue.config.productionTip = false

//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
//
axios.interceptors.request.use(function(config) { //配置发送请求的信息
 //   store.dispatch('showLoading');
    return config;
}, function(error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response) { //配置请求回来的信息
 //   store.dispatch('hideLoading');
    return response;
}, function(error) {
    return Promise.reject(error);
});
axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios;

// 页面切换显示loading
router.beforeEach(function (to, from, next) {
    store.commit('updateLoadingStatus', {isLoading: true})
    next()
  })  
router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
