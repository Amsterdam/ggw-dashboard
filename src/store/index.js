import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gebied: null,
    wijk: null,
    buurt: null,
    gwb: null,
    thema: null,
    meta: null,
    variables: null
  },
  actions: {
    setGebied: (store, gebied) => {
      store.commit('gebied', gebied)
    },
    setWijk: (store, wijk) => {
      store.commit('wijk', wijk)
    },
    setBuurt: (store, buurt) => {
      store.commit('buurt', buurt)
    },
    setGWB: (store, gwb) => {
      store.commit('gwb', gwb)
    },
    setThema: (store, thema) => store.commit('thema', thema),
    setMeta: (store, meta) => store.commit('meta', meta),
    setVariables: (store, variables) => store.commit('variables', variables)
  },
  mutations: {
    gebied: (state, gebied) => { state.gebied = gebied },
    wijk: (state, wijk) => { state.wijk = wijk },
    buurt: (state, buurt) => { state.buurt = buurt },
    gwb: (state, gwb) => { state.gwb = gwb },
    thema: (state, thema) => { state.thema = thema },
    meta: (state, meta) => { state.meta = meta },
    variables: (state, variables) => { state.variables = variables }
  },
  getters: {
    gebied: state => state.gebied,
    wijk: state => state.wijk,
    buurt: state => state.buurt,
    gwb: state => state.gwb,
    thema: state => state.thema,
    meta: state => state.meta,
    variables: state => state.variables
  }
})
