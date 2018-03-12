import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gebied: null, // The current gebied, null means Amsterdam
    wijk: null, // The current wijk, null means all wijken within gebied
    buurt: null, // The current buurt, null means all buurten within wijk
    gwb: null, // The 'lowest' current selection, buurt, or else wijk, or else gebied, or else Amsterdam
    thema: null, // The current thema, null will normally never occur and is only an intial value
    meta: null // All available meta variable info. Precondition to show anything in the GUI
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
    setMeta: (store, meta) => store.commit('meta', meta)
  },
  mutations: {
    gebied: (state, gebied) => { state.gebied = gebied },
    wijk: (state, wijk) => { state.wijk = wijk },
    buurt: (state, buurt) => { state.buurt = buurt },
    gwb: (state, gwb) => { state.gwb = gwb },
    thema: (state, thema) => { state.thema = thema },
    meta: (state, meta) => { state.meta = meta }
  },
  getters: {
    gebied: state => state.gebied,
    wijk: state => state.wijk,
    buurt: state => state.buurt,
    gwb: state => state.gwb,
    thema: state => state.thema,
    meta: state => state.meta
  }
})
