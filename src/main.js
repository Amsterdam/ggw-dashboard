// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'leaflet/dist/leaflet.css'

import 'stijl/dist/css/ams-stijl.css'
import '../static/app.scss'

import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'

import App from './App'
import router from './router'
import store from './store'
import util from './services/util'

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

/**
 * Simple filter to display a cijfer
 * The Localestring method is used to correctly display numerical values
 */
Vue.filter('displaywaarde', util.displayWaarde)

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
      setMeta: 'setMeta'
    }),

    /**
     * Meta information is a precondition for the application to work
     * Without meta no information can be shown
     * @returns {Promise<void>}
     */
    async init () {
      window.hideIntro && window.hideIntro() // Hide any introduction message

      const meta = await util.getAllMeta()
      this.setMeta(meta)
    }
  }
})

vueApp.init()
