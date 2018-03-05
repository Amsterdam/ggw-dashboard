<template>
  <div>
    <div v-if="gwb && meta">
      <div class="grid-title">
        <h2>Not Yet Implemented</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Bevolking',
  components: {
  },
  data () {
    return {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
