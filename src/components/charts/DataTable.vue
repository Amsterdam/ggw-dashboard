<template>
  <div>
    <table class="table table-sm table-bordered" v-if="data">
      <thead>
        <tr>
          <th :colspan="Object.keys(data).length && Object.keys(data)[0] ? 2 : undefined"></th>
          <th v-for="y in years" :key="y" class="text-center">{{y}}</th>
        </tr>
      </thead>

      <tbody v-for="(d, tussenkop) of data" :key="tussenkop">
        <tr v-for="item of d" :key="item.meta.indicatorDefinitieId">
          <th
            scope="row"
            :rowspan="d.length"
            v-if="item.meta.tussenkopjeKerncijfertabel"
            valign="top"
          >
            <span v-if="tussenkop != 'empty'">{{item.meta.tussenkopjeKerncijfertabel}}</span>

            <span v-else>&nbsp;</span>
          </th>
          <td>
            <tooltip :cijfers="d" :cijfer="item">{{item.label}}</tooltip>
          </td>
          <td
            v-for="y in years"
            :key="y"
            :style="{'background-color': item[y].color, 'color' : item[y].textColor}"
            class="text-center"
          >
            <tooltip :cijfers="d" :cijfer="item" v-if="item[y].waarde">{{ item[y] | displaywaarde }}</tooltip>
            <tooltip :cijfers="d" :cijfer="item" v-else>n.b.</tooltip>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import tooltip from '../Tooltip'

import util from '../../services/util'

export default {
  name: 'DataTable',
  components: {
    tooltip
  },
  props: ['config'],
  data() {
    return {
      data: null,
      years: []
    }
  },
  computed: {
    ...mapGetters(['gwb'])
  },
  methods: {
    async updateData() {
      const data = await util.getConfigCijfers(this.gwb, this.config)

      /**
       * Show the last 4 years only
       * @type {*}
       */
      const cijfers = util.getYearCijfers(data)
      const maxYear = util.getMaxYear(cijfers)
      this.years = [3, 2, 1, 0].map(i => maxYear - i)
      const categorizedData = {}

      for (const dataItem of data) {
        const item = Object.assign({}, dataItem)
        const meta = Object.assign({}, dataItem.meta)
        const tussenKop = (meta && meta.tussenkopjeKerncijfertabel) || 'empty'

        item.tooltipText = item.tooltip ? item.tooltip(false) : ''

        if (tussenKop === 'empty') {
          meta.tussenkopjeKerncijfertabel = 'empty'
        }

        if (!Object.keys(categorizedData).includes(tussenKop)) {
          categorizedData[tussenKop] = []
        } else {
          meta.tussenkopjeKerncijfertabel = undefined
        }

        item.meta = meta
        categorizedData[tussenKop].push(item)

        for (const year of this.years) {
          item[year] = { jaar: year, waarde: '' }

          if (item.cijfers) {
            item[year] = item.cijfers.find(c => c.jaar === year) || item[year]
          }
        }
      }

      this.data = categorizedData
    }
  },
  watch: {
    gwb() {
      this.updateData()
    }
  },
  created() {
    this.updateData()
  }
}
</script>

<style scoped>
td.text-center {
  text-align: center;
}

table tbody {
  border-bottom: 1px solid #bebebe;
}

table tbody th {
  font-family: 'AvenirNextLTW01-Regular', verdana, sans-serif;
}

table tbody tr:first-child td {
  border-top: 1px solid black;
}

table tr:hover {
  background-color: transparent;
}

table tr:hover td:not([rowspan]) {
  background-color: #f3f3f3;
}
</style>
