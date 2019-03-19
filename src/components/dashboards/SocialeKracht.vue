<template>
  <div v-if="gwb && meta">
    <b-row>
      <b-col cols="12" class="card">
        <b-row>
          <b-col cols="12" class="grid-title">
            <h2>Aantal kwetsbare bewoners</h2>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <horizontal-text
              title="Lage SES"
              icon="onderwijs_scholingslening.png"
              caption="lage score op inkomen én opleiding:"
              :config="lageSES"
            />
          </b-col>

          <b-col>
            <horizontal-text
              title="Meest kwetsbaar"
              icon="adams_sociaal_rood.png"
              caption="lage score op inkomen, opleiding, werk én gezondheid:"
              :config="meestKwetsbaar" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <b-row>
          <b-col cols="12" class="grid-title">
            <h2>Ontwikkeling sociale kracht {{gwb.naam}}</h2>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <data-table :config="kerncijfers" :isCentered="false"></data-table>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <b-row>
          <b-col cols="12" class="grid-title">
            <h2>Verschillen binnen het gebied</h2>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <verschillen-gebied :config="kerncijfers"></verschillen-gebied>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" class="card">
        <b-row>
          <b-col cols="12" class="grid-title">
            <h2>0-17 Jaar</h2>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="skOnder17"></vertical-bar-chart>
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="skOnder17Minimajongeren"></vertical-bar-chart>
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="skOnder17Eenoudergezinnen"></vertical-bar-chart>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="skOnder17LaagOpgeleideOuders"></vertical-bar-chart>
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="skOnder17BasisschoolAdvies"></vertical-bar-chart>
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="skOnder17HogeKostenGezondheidszorg"></vertical-bar-chart>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" class="card">
        <b-row>
          <b-col cols="12" class="grid-title">
            <h2>18-27 Jaar</h2>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk1827"></vertical-bar-chart>
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk1827LSV"></vertical-bar-chart>
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk1827HogeKostenGezondheidszorg"></vertical-bar-chart>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" class="card">
        <b-row>
          <b-col cols="12" class="grid-title">
            <h2>28-65 Jaar</h2>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk2865"></vertical-bar-chart>
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk2865Minimavolwassenen"></vertical-bar-chart>
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk2865VroegEropafMelding"></vertical-bar-chart>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk2865LaagOpgeleid"></vertical-bar-chart>
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk2865GeenWerk"></vertical-bar-chart>
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk2865HogeKostenGezondheidszorg"></vertical-bar-chart>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" class="card">
        <b-row>
          <b-col cols="12" class="grid-title">
            <h2>66+</h2>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk66Plus"></vertical-bar-chart>
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk66Plus80Plus"></vertical-bar-chart>
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk66Plus80PlusAlleenwonend"></vertical-bar-chart>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk66PlusMinimaOuderen"></vertical-bar-chart>
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk66PlusLaagOpgeleid"></vertical-bar-chart>
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk66PlusHogeKostenGezondheidszorg"></vertical-bar-chart>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { SOCIALE_KRACHT, getKerncijfers } from '../../services/thema'

import horizontalText from '../charts/HorizontalText'
import dataTable from '../charts/DataTable'
import verticalBarChart from '../charts/VerticalBarChart'
import verschillenGebied from '../VerschillenGebied'
import lageSES from '../../../static/links/lage_ses.json'
import meestKwetsbaar from '../../../static/links/meest_kwetsbaar.json'

import skOnder17 from '../../../static/links/sociale_kracht/onder17/onder17.json'
import skOnder17Minimajongeren from '../../../static/links/sociale_kracht/onder17/minimajongeren.json'
import skOnder17Eenoudergezinnen from '../../../static/links/sociale_kracht/onder17/eenoudergezinnen.json'
import skOnder17LaagOpgeleideOuders from '../../../static/links/sociale_kracht/onder17/laag_opgeleide_ouders.json'
import skOnder17BasisschoolAdvies from '../../../static/links/sociale_kracht/onder17/basisschool_advies.json'
import skOnder17HogeKostenGezondheidszorg from '../../../static/links/sociale_kracht/onder17/hoge_kosten_gezondheidszorg.json'

import sk1827 from '../../../static/links/sociale_kracht/18_27/18_27.json'
import sk1827LSV from '../../../static/links/sociale_kracht/18_27/lsv.json'
import sk1827HogeKostenGezondheidszorg from '../../../static/links/sociale_kracht/18_27/hoge_kosten_gezondheidszorg.json'

import sk2865 from '../../../static/links/sociale_kracht/28_65/28_65.json'
import sk2865Minimavolwassenen from '../../../static/links/sociale_kracht/28_65/minimavolwassenen.json'
import sk2865VroegEropafMelding from '../../../static/links/sociale_kracht/28_65/vroeg_eropaf_melding.json'
import sk2865LaagOpgeleid from '../../../static/links/sociale_kracht/28_65/laag_opgeleid.json'
import sk2865GeenWerk from '../../../static/links/sociale_kracht/28_65/geen_werk.json'
import sk2865HogeKostenGezondheidszorg from '../../../static/links/sociale_kracht/28_65/hoge_kosten_gezondheidszorg.json'

import sk66Plus from '../../../static/links/sociale_kracht/66+/66+.json'
import sk66Plus80Plus from '../../../static/links/sociale_kracht/66+/80+.json'
import sk66Plus80PlusAlleenwonend from '../../../static/links/sociale_kracht/66+/80+_alleenwonend.json'
import sk66PlusMinimaOuderen from '../../../static/links/sociale_kracht/66+/minima_ouderen.json'
import sk66PlusLaagOpgeleid from '../../../static/links/sociale_kracht/66+/laag_opgeleid.json'
import sk66PlusHogeKostenGezondheidszorg from '../../../static/links/sociale_kracht/66+/hoge_kosten_gezondheidszorg.json'

const kerncijfers = getKerncijfers(SOCIALE_KRACHT)

export default {
  name: 'SocialeKracht',
  components: {
    'horizontal-text': horizontalText,
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'vertical-bar-chart': verticalBarChart
  },
  data () {
    return {
      kerncijfers,
      lageSES,
      meestKwetsbaar,
      skOnder17,
      skOnder17Minimajongeren,
      skOnder17Eenoudergezinnen,
      skOnder17LaagOpgeleideOuders,
      skOnder17BasisschoolAdvies,
      skOnder17HogeKostenGezondheidszorg,

      sk1827,
      sk1827LSV,
      sk1827HogeKostenGezondheidszorg,

      sk2865,
      sk2865Minimavolwassenen,
      sk2865VroegEropafMelding,
      sk2865LaagOpgeleid,
      sk2865GeenWerk,
      sk2865HogeKostenGezondheidszorg,

      sk66Plus,
      sk66Plus80Plus,
      sk66Plus80PlusAlleenwonend,
      sk66PlusMinimaOuderen,
      sk66PlusLaagOpgeleid,
      sk66PlusHogeKostenGezondheidszorg
    }
  },
  computed: {
    ...mapGetters([
      'gwb',
      'meta'
    ])
  },
  methods: {
  },
  watch: {
  }
}
</script>
