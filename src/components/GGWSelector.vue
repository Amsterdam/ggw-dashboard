<!--Example of a component that uses D3-->
<template>
  <div class="alert">
    <div class="row">
      <div class="col-sm">
        <div class="row">
          <div class="col-sm-4">Gebied</div>
          <div class="col-sm-8" v-if="gebied">> <span class="selected-value">{{gebied.naam}}</span></div>
        </div>
        <div class="row">
          <div class="col-sm-4">Wijk</div>
          <div class="col-sm-8" v-if="wijk">> <span class="selected-value">{{wijk.naam}}</span></div>
        </div>
        <div class="row">
          <div class="col-sm-4">Buurt</div>
          <div class="col-sm-8" v-if="buurt">> <span class="selected-value">{{buurt.naam}}</span></div>
        </div>
      </div>
      <div class="col-sm">
        <div class="row">
          <div class="col-sm-4">Thema</div>
          <div class="col-sm-8">> <span class="selected-value">Gebied in het kort</span></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'GGWSelector',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'gebied',
      'wijk',
      'buurt'
    ])
  },
  methods: {
    ...mapActions({
    })
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
  @import "../../static/ams";

  .selected-value {
    color: $ams-rood;
    font-weight: bold;
  }
</style>
