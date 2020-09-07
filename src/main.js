import Vue from 'vue'
import './plugins/fontawesome'
import 'babel-polyfill';

import store from './store/store.js'
import router from './router/router.js'

import './registerServiceWorker.js'

import App from './App.vue'

Vue.config.productionTip = false

Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
});

import i18n from './plugins/i18n/i18n';
import customvuetify from './plugins/vuetify'

var vm = new Vue({
  store,
  router,
  i18n,
  vuetify: customvuetify,
  render: h => h(App),
});

import VueCookies from 'vue-cookies';
Vue.use(VueCookies);
VueCookies.config('1d')

import auth from './common/auth.js'
Vue.use(auth, {
  vm: vm
})

import util from './common/util.js'
Vue.use(util, {
  vm: vm
})

vm.$mount('#app')