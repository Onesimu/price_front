import Vue from 'vue'
import VueI18n from 'vue-i18n'
import NProgress from 'vue-nprogress'
import DemoSection from 'components/DemoSection'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import { TOGGLE_PAGE, TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'
import locales from 'i18n/locales'
import Promise from 'es6-promise'
// 引入 网络请求模块
import http from './utils/http.js';
Vue.prototype.$http = http;

// const spring = require('spring-data-rest-js');
import spring from 'spring-data-rest-js'
spring.requestConfig.baseURL = 'http://localhost:8080//rest//';
spring.entityConfig.restBaseURL = 'http://localhost:8080//rest//';

spring.Carrier = spring.extend('carriers');
spring.Country = spring.extend('countries');
spring.Port = spring.extend('ports');
spring.Seaexpressprice = spring.extend('seaexpressprices');
spring.Userinfo = spring.extend('userinfoes');

Vue.prototype.$spring = spring;

Promise.polyfill()
Vue.use(NProgress)
Vue.use(VueI18n)
Vue.component('demo-section', DemoSection)

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: locales
})


// Enable devtools
Vue.config.devtools = true

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

const { state } = store

router.beforeEach((route, redirect, next) => {
  store.commit(TOGGLE_PAGE, route.path.split('/')[1])
  if (state.app.device.isMobile && state.app.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
  }
  next()
})

const app = new Vue({
  i18n,
  router,
  store,
  nprogress,
  ...App
})

export { app, router, store }
