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
            <vertical-bar-chart :config="skOnder17" />
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="skOnder17Minimajongeren" />
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="skOnder17Eenoudergezinnen" />
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="skOnder17LaagOpgeleideOuders" />
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="skOnder17BasisschoolAdvies" />
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="skOnder17Overgewicht" />
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
            <vertical-bar-chart :config="sk1826" />
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk1826LSV" />
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk1826Arbeidsparticipatie" />
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
            <vertical-bar-chart :config="sk2765" />
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk2765Minimavolwassenen" />
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk2765VroegEropafMelding" />
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk2765LaagOpgeleid" />
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk2765GeenWerk" />
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
            <vertical-bar-chart :config="sk66Plus" />
          </b-col>

          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk66Plus80PlusAlleenwonend" />
          </b-col>
          <b-col lg="4" class="content-centered">
            <vertical-bar-chart :config="sk66PlusMinimaOuderen" />
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
import skOnder17Overgewicht from '../../../static/links/sociale_kracht/onder17/overgewicht.json'

import sk1826 from '../../../static/links/sociale_kracht/18_26/18_26.json'
import sk1826LSV from '../../../static/links/sociale_kracht/18_26/lsv.json'
import sk1826Arbeidsparticipatie from '../../../static/links/sociale_kracht/18_26/netto_arbeidsparticipatie.json'

import sk2765 from '../../../static/links/sociale_kracht/27_65/27_65.json'
import sk2765Minimavolwassenen from '../../../static/links/sociale_kracht/27_65/minimavolwassenen.json'
import sk2765VroegEropafMelding from '../../../static/links/sociale_kracht/27_65/vroeg_eropaf_melding.json'
import sk2765LaagOpgeleid from '../../../static/links/sociale_kracht/27_65/laag_opgeleid.json'
import sk2765GeenWerk from '../../../static/links/sociale_kracht/27_65/geen_werk.json'

import sk66Plus from '../../../static/links/sociale_kracht/66+/66+.json'
import sk66Plus80PlusAlleenwonend from '../../../static/links/sociale_kracht/66+/80+_alleenwonend.json'
import sk66PlusMinimaOuderen from '../../../static/links/sociale_kracht/66+/minima_ouderen.json'

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
      skOnder17Overgewicht,

      sk1826,
      sk1826LSV,
      sk1826Arbeidsparticipatie,

      sk2765,
      sk2765Minimavolwassenen,
      sk2765VroegEropafMelding,
      sk2765LaagOpgeleid,
      sk2765GeenWerk,

      sk66Plus,
      sk66Plus80PlusAlleenwonend,
      sk66PlusMinimaOuderen
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
