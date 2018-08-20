import Vue from 'vue'
import VueI18n from 'vue-i18n'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import { TOGGLE_PAGE, TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'
import locales from 'i18n/locales'

import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'
Vue.use(VueBlu)

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
Vue.use(Buefy)

import Promise from 'es6-promise'
Promise.polyfill()
// 引入 网络请求模块
import http from './utils/http.js';
Vue.prototype.$http = http;

// const spring = require('spring-data-rest-js');
import spring from 'spring-data-rest-js'
spring.requestConfig.baseURL = '//';
spring.entityConfig.restBaseURL = '//rest//';
// spring.requestConfig.globalFetchOptions.credentials = 'omit'

spring.Carrier = spring.extend('carriers');
spring.Country = spring.extend('countries');
spring.Port = spring.extend('ports');
spring.Seaexpressprice = spring.extend('seaexpressprices');
spring.Userinfo = spring.extend('userinfoes');
spring.CarrierView = spring.extend('carrierviews');
spring.PortView = spring.extend('portviews')
spring.SeaexpresspriceView = spring.extend('seaexpresspriceviews')

Vue.prototype.$spring = spring;

Vue.prototype.$db = {country:[],port:[],carrier:[]};

Vue.use(NProgress)

Vue.use(VueI18n)

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
