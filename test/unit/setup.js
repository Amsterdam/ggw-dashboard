import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import VueAxios from 'vue-axios'

import BootstrapVue from 'bootstrap-vue'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)

Vue.config.productionTip = false
