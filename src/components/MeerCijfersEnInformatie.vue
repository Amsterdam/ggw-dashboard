<template>
  <div class="grid_12">
    <div class="grid-blok grid_6 lijst">
      <div class="grid-element">
        <h2 class="blok-titel">Meer informatie</h2>
        <ul class="links">
          <li v-for="info in meerInformatie" :key="info.label">
            <a :href="info.url" class="outsite" target="_blank" rel="noreferrer"><span class="linklabel">{{info.label}}</span></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="grid-blok grid_6 lijst">
      <div class="grid-element">
        <h2 class="blok-titel">Meer cijfers</h2>
        <ul class="links">
          <li v-for="info in meerCijfers" :key="info.label">
            <a :href="info.url" class="outsite" target="_blank" rel="noreferrer"><span class="linklabel">{{info.label}}</span></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="grid-blok grid_12">
      <div class="grid-element">
        <h2 class="blok-titel">Colofon</h2>
        <p>
        Gebied in Beeld is gemaakt door OIS in opdracht van de samenwerkende stadsdelen.<br>
        Contact: <a href="mailto:algemeen.OIS@amsterdam.nl">algemeen.OIS@amsterdam.nl</a>
        </p>
      </div>
    </div>
    <div class="grid-blok grid_12">
      <div class="grid-element">
        <h2 class="blok-titel">Disclaimer</h2>
        <p>
        De inhoud van Gebied in Beeld is met uiterste zorgvuldigheid tot stand gebracht.
        De inhoud wordt regelmatig gecontroleerd en geactualiseerd.
        OIS kan echter niet aansprakelijk worden gesteld voor de juistheid, volledigheid en actualiteit van de website.
        OIS kan in het bijzonder niet aansprakelijk worden gesteld voor eventuele schade of consequenties ontstaan door direct of indirect gebruik van de inhoud van de website.
        </p>
        <p>
        Alle informatie op Gebied in Beeld valt onder Copyright © van OIS, tenzij een andere bron is vermeld.<br>
        Het overnemen van gegevens is met de volgende bronvermelding toegestaan: <b>OIS Amsterdam</b>.
        </p>
        <p>
          Wilt u informatie hergebruiken, neem dan even contact op met OIS via <a href="mailto:algemeen.OIS@amsterdam.nl">algemeen.OIS@amsterdam.nl</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import meerInformatie from '../../static/links/meer_informatie'
import meerCijfers from '../../static/links/meer_cijfers'

export default {
  name: 'MeerCijfersEnInformatie',
  components: {
  },
  data () {
    return {
      meerInformatie,
      meerCijfers
    }
  },
  computed: {
  },
  methods: {
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
