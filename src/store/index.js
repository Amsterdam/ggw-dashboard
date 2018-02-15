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
    setGebied: (store, gebied, wijk = null, buurt = null) => {
      store.commit('gebied', gebied)
      store.commit('wijk', wijk)
      store.commit('buurt', buurt)
      store.commit('gwb')
    },
    setWijk: (store, wijk, buurt = null) => {
      store.commit('wijk', wijk)
      store.commit('buurt', buurt)
      store.commit('gwb')
    },
    setBuurt: (store, buurt) => {
      store.commit('buurt', buurt)
      store.commit('gwb')
    },
    setThema: (store, thema) => store.commit('thema', thema),
    setMeta: (store, meta) => store.commit('meta', meta),
    setVariables: (store, variables) => store.commit('variables', variables)
  },
  mutations: {
    gebied: (state, gebied) => { state.gebied = gebied },
    wijk: (state, wijk) => { state.wijk = wijk },
    buurt: (state, buurt) => { state.buurt = buurt },
    gwb: (state) => { state.gwb = state.buurt || state.wijk || state.gebied },
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
