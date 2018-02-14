<template>
  <div>

    <form v-on:submit.prevent="filter()">
      <div class="form-group">
        <label for="filterMeta">Filter text</label>
        <input v-on:keyup.enter="filter()" v-model="filterText" type="text" class="form-control" id="filterMeta" aria-describedby="filterHelp" placeholder="Enter filter text">
        <small id="filterHelp" class="form-text text-muted">Filter on variable, label or definitie</small>
      </div>
      <button type="submit" class="btn btn-primary" v-on:click="filter()" :disabled="!filterText">Filter</button>
      <button type="button" class="btn btn-primary" v-on:click="clear()">Clear</button>
    </form>

    <div v-if="detail" class="row">
      <div class="col-sm-6 offset-3">
        <h3>{{detail.meta.variabele}}</h3>
        <p>{{detail.meta.definitie}}</p>
        <table class="table table-sm">
          <thead>
          <tr>
            <th>jaar</th>
            <th>waarde</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="c in detail.cijfers" :key="c.jaar">
            <td>{{c.jaar}}</td>
            <td>{{c.waarde}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="filteredMeta">
      <table class="table table-sm">
        <thead>
        <tr>
          <th v-for="(value, propertyName) in meta[0]" :key="propertyName">{{propertyName}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="m in filteredMeta" :key="m.id" v-on:click="getDetails(m)">
          <td v-for="(v, p) in m" :key="`${m.id}.${p}`">{{v}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      No Results found
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import util from '../services/util'

export default {
  name: 'Meta',
  components: {
  },
  data () {
    return {
      filterText: null,
      filterRegExp: null,
      filteredMeta: null,
      detail: null
    }
  },
  computed: {
    ...mapGetters([
      'gebied',
      'meta'
    ])
  },
  methods: {
    ...mapActions({
    }),
    filter () {
      this.filterRegExp = RegExp(this.filterText, 'i')
      this.filteredMeta = this.meta.filter(this.matchesFilter)
    },
    matchesFilter (meta) {
      return this.filterRegExp === null || (
        this.filterRegExp.test(meta.variabele) ||
        this.filterRegExp.test(meta.label) ||
        this.filterRegExp.test(meta.definitie))
    },
    clear () {
      this.filterText = null
      this.filterRegExp = null
      this.filteredMeta = this.meta
    },
    async getDetails (meta) {
      const cijfers = await util.getCijfers(this.gebied, meta)
      console.log('cijfers', cijfers)
      this.detail = {
        meta,
        cijfers
      }
    }
  },
  watch: {
    'meta' (to, from) {
      this.filteredMeta = this.meta
    },
    '$route' (to, from) {
      console.log('route', to, from)
    }
  }
}
</script>
