<template>
  <div>

    <div class="row mode_input text row_verplicht">
      <div class="label">
        <label for="formInput">Filter on variable, label or definitie</label>
      </div>

      <div class="invoer">
        <input v-on:keyup.enter="filter()"
               v-model="filterText"
               type="text"
               id="formInput"
               class="input"
               placeholder="Enter filter text regular expression">
      </div>

      <button class="action primary" v-on:click="filter()" :disabled="!filterText">
        <span class="value"> Filter</span>
      </button>
      <button class="action secondary-blue" v-on:click="clear()">Clear</button>
    </div>

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
          <!--Take first meta to get the header keys-->
          <th v-for="(v, p) in meta['BEVTOTAAL']" :key="p">{{p}}</th>
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
import util from '../../services/util'

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
      'gwb',
      'meta'
    ])
  },
  methods: {
    ...mapActions({
    }),
    filter () {
      this.filterRegExp = RegExp(this.filterText, 'i') // case insensitive
      const filteredMeta = {}
      for (let key of Object.keys(this.meta)) {
        if (this.matchesFilter(this.meta[key])) {
          filteredMeta[key] = this.meta[key]
        }
      }
      this.filteredMeta = filteredMeta
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
      this.detail = null
    },
    async getDetails (meta) {
      if (meta && this.gwb) {
        const cijfers = await util.getGebiedCijfers(meta.variabele, this.gwb)
        this.detail = {
          meta,
          cijfers: cijfers.cijfers
        }
      } else {
        this.detail = null
      }
    }
  },
  watch: {
    'meta' () {
      this.filteredMeta = this.meta
    },
    'gwb' () {
      this.getDetails(this.detail && this.detail.meta)
    }
  },
  created () {
    this.filteredMeta = this.meta
  }
}
</script>
