<template>
  <div>
    <table class="table table-sm table-bordered" v-if="data">
      <thead>
        <tr>
          <th :colspan="Object.keys(data).length && Object.keys(data)[0] ? 2 : undefined"></th>
          <th v-for="y in years" :key="y" class="text-center">{{y}}</th>
        </tr>
      </thead>

      <tbody v-for="(d, tussenkopje) of data" :key="tussenkopje">
        <tr v-for="item of d" :key="item.meta.variabele">
          <th
            scope="row"
            :rowspan="d.length"
            v-if="item.meta.tussenkopje_kerncijfertabel"
            valign="top"
          >
            {{item.meta.tussenkopje_kerncijfertabel}}
          </th>
          <td>
            <tooltip :cijfers="d" :cijfer="item">{{item.label}}</tooltip>
          </td>
          <td
            v-for="y in years" :key="y"
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
    'tooltip': tooltip
  },
  props: [
    'config'
  ],
  data () {
    return {
      data: null,
      years: []
    }
  },
  computed: {
    ...mapGetters([
      'gwb'
    ])
  },
  methods: {
    async updateData () {
      const data = await util.getConfigCijfers(this.gwb, this.config)

      // temp var for demo purposes; will be removed after client approval
      const tussenkopjes = [
        'Brandveiligheid',
        'Cultuur',
        'Diversiteit',
        'Duurzaamheid',
        'Huishoudens',
        'Inkomen',
        'Jeugd',
        'Onderwijs',
        'Oordeel buurt',
        'Openbare ruimte',
        'Overlast',
        'Participatie',
        'Personen',
        'Sport',
        'Veiligheid',
        'Verkeer',
        'Vestigingen',
        'Welzijn',
        'Werk',
        'Werkgelegenheid',
        'Wonen',
        'Woningprijzen',
        'Woningvoorraad',
        'Zorg'
      ]
      // temp var for demo purposes; will be removed after client approval
      const tussenKopjesSlice = tussenkopjes.sort(() => 0.5 - Math.random()).slice(0, Math.floor((Math.random() * 4 + 1)))

      /**
       * Show the last 4 years only
       * @type {*}
       */
      const cijfers = util.getYearCijfers(data)
      const maxYear = util.getMaxYear(cijfers)
      this.years = [3, 2, 1, 0].map(i => maxYear - i)
      const categorizedData = {}

      for (let item of data) {
        // temp var for demo purposes; will be removed after client approval
        const randomTussenkopje = '' // tussenKopjesSlice[Math.floor(Math.random() * tussenKopjesSlice.length)]
        // temp var for demo purposes; will be removed after client approval
        const index = tussenKopjesSlice.indexOf(randomTussenkopje)

        // temp var for demo purposes; will be removed after client approval
        item.meta.tussenkopje_kerncijfertabel = randomTussenkopje
        // temp var for demo purposes; will be removed after client approval
        item.meta.volgorde_kerncijfertabel = index
        item.tooltipText = item.tooltip ? item.tooltip(false) : ''

        if (!Object.keys(categorizedData).includes(randomTussenkopje)) {
          categorizedData[randomTussenkopje] = []
        } else {
          item.meta.tussenkopje_kerncijfertabel = undefined
        }

        categorizedData[randomTussenkopje].push(item)

        for (let year of this.years) {
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
    'gwb' () {
      this.updateData()
    }
  },
  created () {
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
    font-family: "AvenirNextLTW01-Regular", verdana, sans-serif;
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
