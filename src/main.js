// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'leaflet/dist/leaflet.css'

import '../static/ams.scss'

import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import * as uiv from 'uiv'

import App from './App'
import router from './router'
import store from './store'
import util from './services/util'

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(uiv, {prefix: 'uiv'})
Vue.config.productionTip = false

/* eslint-disable no-new */
let vueApp = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    ...mapActions({
      setGebied: 'setGebied',
      setWijk: 'setWijk',
      setBuurt: 'setBuurt',
      setThema: 'setThema',
      setMeta: 'setMeta',
      setVariables: 'setVariables'
    }),
    async init () {
      // Thanks to http://www.csvjson.com/csv2json

      const themas = await util.getThemas()
      console.log('themas', themas)

      const meta = await util.getMeta()
      console.log('meta', meta)

      const variables = await util.getVariables()
      console.log('variables', variables)
    }
  }
})

vueApp.init()
