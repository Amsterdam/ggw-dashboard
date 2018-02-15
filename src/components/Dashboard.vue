<!--Example of a component with a link and how to watch for state changes-->
<template>
  <div v-if="gwb">

    <div class="row">
      <div class="col-sm">
        <pano></pano>
      </div>
      <div class="col-sm">
        <in-aantallen></in-aantallen>
      </div>
    </div>

    <div class="alert">
      <h2>Samenstelling woningvoorraad en bevolking van {{gwb.naam}}</h2>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <woning-voorraad></woning-voorraad>
      </div>
      <div class="col-sm-6">
        <woning-voorraad></woning-voorraad>
      </div>
    </div>

    <div class="row">
      <div class="col-sm">
        <placeholder title="Woningvoorraad" pic="woningvoorraad.png" height="100"></placeholder>
      </div>
      <div class="col-sm">
        <placeholder title="Sociaal-economische" pic="sociaal-economisch.png" height="100"></placeholder>
      </div>
    </div>

    <div class="row">
      <div class="col-sm">
        <placeholder title="Leeftijd" pic="leeftijd.png" height="100"></placeholder>
      </div>
      <div class="col-sm">
        <placeholder title="Migratie-achtergrond" pic="migratie-achtergrond.png" height="100"></placeholder>
      </div>
    </div>

    <div class="alert">
      <h2>Positie en ontwikkeling van [XXX] t.o.v. het stedelijk gemiddelde</h2>
    </div>

    <div class="row">
      <div class="col-sm">
        <placeholder title="tabel" pic="tabel.png" height="200"></placeholder>
      </div>
      <div class="col-sm">
        <placeholder title="plot" pic="plot.png" height="200"></placeholder>
      </div>
    </div>

    <div class="alert">
      <h2>Bewoners over hun eigen buurt en woning</h2>
    </div>

    <div class="row">
      <div class="col-sm">
        <placeholder title="Eigen buurt" pic="eigenbuurt.png" height="100"></placeholder>
      </div>
      <div class="col-sm">
        <placeholder title="Eigen woning" pic="eigenwoning.png" height="100"></placeholder>
      </div>
    </div>

    <div class="alert">
      <h2>Verschillen binnen het gebied</h2>
    </div>

    <div class="row">
      <div class="col-sm">
        <placeholder title="kaart" pic="kaart.png" height="200"></placeholder>
      </div>
      <div class="col-sm">
        <placeholder title="toelichting" pic="toelichting.png" height="200"></placeholder>
      </div>
    </div>

    <div class="alert">
      <div class="row">
        <div class="col-sm">
          <h2>Aantal woningen</h2>
        </div>
        <div class="col-sm">
          <h2>Andere woonvormen</h2>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm">
        <placeholder title="graph" pic="graph.png" height="200"></placeholder>
      </div>
      <div class="col-sm">
        <placeholder title="woonvormen" pic="andere-woonvormen.png" height="200"></placeholder>
      </div>
    </div>

    <div class="alert">
      <h2>Woningen naar eigendom en woonlasten</h2>
    </div>

    <vertical-bar-chart></vertical-bar-chart>
    <pie-chart></pie-chart>

    <div class="row">
      <div class="col-sm">
        <placeholder title="gemiddelde WOZ-waarde" pic="gemiddelde-woz-waarde.png" height="100"></placeholder>
      </div>
      <div class="col-sm">
        <placeholder title="gemiddelde WOZ-waarde/m2" pic="gemiddelde-woz-waarde-m2.png" height="100"></placeholder>
      </div>
      <div class="col-sm">
        <placeholder title="gemiddelde huur vrij sector" pic="gemiddelde-huur-vrije-sector.png" height="100"></placeholder>
      </div>
    </div>

    <div class="row">
      <div class="col-sm">
        <placeholder title="graph" height="200" pic="huur-verdeling.png"></placeholder>
      </div>
      <div class="col-sm">
        <placeholder title="grootte van de woningen" pic="grootte-van-woningen.png" height="100"></placeholder>
      </div>
    </div>

    <div class="alert">
      <h2>Woningen voor ouderen</h2>
    </div>

    <div class="row">
      <div class="col-sm">
        <placeholder title="% Nultredewoningen" pic="nultrede.png" height="100"></placeholder>
      </div>
      <div class="col-sm">
        <placeholder title="% Verhuisgeneigden 65+" pic="verhuis-65+.png" height="100"></placeholder>
      </div>
      <div class="col-sm">
        <placeholder title="% 65+ dat woning geschikt vindt om oud in te worden" pic="65+-geschikt.png" height="100"></placeholder>
      </div>
    </div>

    <div class="alert">
      <div class="row">
        <div class="col-sm">
          <h2>Meer informatie</h2>
        </div>
        <div class="col-sm">
          <h2>Meer cijfers</h2>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm">
        <placeholder title="Informatie links" pic="meer-info.png" height="100"></placeholder>
      </div>
      <div class="col-sm">
        <placeholder title="Cijfer links" pic="meer-cijfers.png" ></placeholder>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vegaExample from './VegaExample'
import leafletExample from './LeafletExample'
import amsHeader from './AMSHeader'
import ggwSelector from './GGWSelector'
import placeholder from './Placeholder'
import woningVoorraad from './WoningVoorraad'
import verticalBarChart from './VerticalBarChart'
import pieChart from './PieChart'
import inAantallen from './InAantallen'
import pano from './Pano'

export default {
  name: 'HelloWorld',
  components: {
    'vega-example': vegaExample,
    'leaflet-example': leafletExample,
    'ams-header': amsHeader,
    'ggw-selector': ggwSelector,
    'woning-voorraad': woningVoorraad,
    'vertical-bar-chart': verticalBarChart,
    'pie-chart': pieChart,
    'in-aantallen': inAantallen,
    'pano': pano,
    'placeholder': placeholder
  },
  data () {
    return {
      selected: '',
      items: Array.from(Array(100).keys()).map(i => ({key: i.toString() + ' element'}))
    }
  },
  computed: {
    ...mapGetters([
      'gwb'
    ])
  },
  methods: {
    ...mapActions({
      setText: 'setText'
    })
  },
  watch: {
    'text' (to, from) {
      // Example of a state change watch
      console.log('text has changed', from, to)
    },
    'selected' (to, from) {
      const found = this.items.find(i => i.key === to.key)
      if (found) {
        console.log('you have selected', found.key)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../static/ams.scss";

  .alert {
    margin-top: 5px;
    background-color: $ams-lichtgrijs;
  }
</style>
