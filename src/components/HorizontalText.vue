<template>
  <div>
    <table class="table table-sm borderless">
      <tbody>
      <tr>
        <td width="10%">
          <img :src="'../../static/icons/' + icon">
          <span class="font-weight-bold">{{title}}</span>
        </td>
        <td>
          <div v-for="d in data" :key="d.label">
            {{d.label}}: {{d.recent.waarde.toLocaleString()}}{{d.na}}
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../services/util'

export default {
  name: 'HorizontalText',
  components: {
  },
  props: [
    'title',
    'icon',
    'config'
  ],
  data () {
    return {
      data: null
    }
  },
  computed: {
    ...mapGetters([
      'gwb'
    ])
  },
  methods: {
    async updateData () {
      const meta = await util.getMeta()
      let data = this.config.map(async c => {
        const cMeta = meta.find(m => m.variabele === c.variabele.toUpperCase())
        if (cMeta) {
          const cijfers = await util.getCijfers(this.gwb, cMeta)
          return {
            label: c.label || cMeta.label,
            ...cijfers
          }
        } else {
          console.log('Error for variable', c.variabele)
          return {
            label: c.label || c.variabele
          }
        }
      })

      data = await Promise.all(data)

      const patt = /_P$/i
      data.forEach(d => {
        if (patt.test(d.meta.variabele)) {
          d.na = '%'
        }
      })

      console.log('data', data)
      this.data = data
    }
  },
  watch: {
    'gwb' () {
      this.updateData()
    }
  },
  created () {
    this.updateData()
  }
}

</script>

<style>
</style>
