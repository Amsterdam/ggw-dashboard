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
            <a :href="info.url" target="_blank" rel="noreferrer"><span class="linklabel">{{info.label}}</span></a>
          </li>
        </ul>
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
