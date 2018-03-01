<template>
  <div>
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
        <div v-for="info in meerInformatie" :key="info.label">
          <a :href="info.url" target="_blank">{{info.label}}</a>
        </div>
      </div>
      <div class="col-sm">
        <div v-for="info in meerCijfers" :key="info.label">
          <a :href="info.url" target="_blank">{{info.label}}</a>
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
</style>
