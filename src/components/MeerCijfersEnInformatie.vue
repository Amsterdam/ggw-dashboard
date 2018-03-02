<template>


    <div class="grid-wrapper wrapper_12 footer-wrapper">
      <div class="grid-container container_12 grid-footer  breakout-container">
        <div class="grid-zone grid_12 z-kolom1-4_1 breakout-zone hasbgcolor bgcolor_darkgrey z-footer-lists">
          <div class="grid-blok grid_6 lijst">
            <div class="grid-element">
              <div class="grid-edge">
                <div class="grid-inside">
                  <h2 class="blok-titel">Meer informatie</h2>
                  <ul class="links">
                    <li v-for="info in meerInformatie" :key="info.label">
                      <a :href="info.url" target="_blank" rel="noreferrer"><span class="linklabel">{{info.label}}</span></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="grid-blok grid_6 lijst">
            <div class="grid-element">
              <div class="grid-edge">
                <div class="grid-inside">
                  <h2 class="blok-titel">Meer cijfers</h2>
                    <ul class="links">
                      <li v-for="info in meerCijfers" :key="info.label">
                        <a :href="info.url" target="_blank" rel="noreferrer"><span class="linklabel">{{info.label}}</span></a>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
  .contents-wrapper .grid-zone.hasbgcolor {
    padding-top: 0;
  }
  .footer-wrapper {
    padding: 0;
  }

  .footer-wrapper .grid-footer {
    padding: 0;
  }
</style>
