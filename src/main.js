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

import panos from '../static/links/panos'

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
      console.log('panos', panos)

      // const gebieden = await util.getGebieden()
      // console.log('gebieden', gebieden)
      //
      // const gebied = gebieden.find(g => g.code === 'DX01')
      // const gebiedDetail = await util.getDetail(gebied)
      // this.setGebied(gebiedDetail)
      //
      // console.log('gebied', gebiedDetail)
      //
      // const wijken = await util.getWijken(gebied)
      // console.log('wijken', wijken)
      //
      // const wijk = wijken.find(w => w.vollcode === 'A01')
      // const wijkDetail = await util.getDetail(wijk)
      // console.log('wijk', wijkDetail)
      // this.setWijk(wijkDetail)
      //
      // const buurten = await util.getBuurten(wijk)
      // console.log('buurten', buurten)
      //
      // const buurt = buurten.find(b => b.code === '01e')
      // const buurtDetail = await util.getDetail(buurt)
      // console.log('buurt', buurtDetail)
      // this.setBuurt(buurtDetail)

      const themas = await util.getThemas()
      console.log('themas', themas)

      const meta = await util.getMeta()
      console.log('meta', meta)
      this.setMeta(meta)

      const variables = await util.getVariables()
      console.log('variables', variables)
      this.setVariables(variables)

      const variable = meta.find(m => m.variabele === 'OSCHBAO')
      console.log('variable', variable)

      // const cijfers = await util.getCijfers(gebiedDetail, variable)
      // console.log('BEVDICHT', cijfers)
    }
  }
})

vueApp.init()
