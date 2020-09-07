import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

// eslint-disable-next-line no-undef
const merge = require('deepmerge')

import msg from './msg.js';
import app from './app.js';
import menu from './menu.js';


const mainStore = {
  strict: true,
}

const finalStore = merge.all([mainStore, app, menu, msg])
// console.log(finalStore)

export default new Vuex.Store(finalStore)