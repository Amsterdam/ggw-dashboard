<template>
  <div class="block-container">
    <div class="grid-blok grid_4">
      <icon :icon="icon" :title="title"></icon>
    </div>
    <div class="grid-blok grid_8">
      <div v-for="d in data" :key="d.label">
        {{d.label}}:
        <span v-if="d.recent"
              v-b-tooltip.hover v-b-tooltip.click v-b-tooltip.left title="">
              {{d.recent | displaywaarde}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import icon from '../Icon'
import util from '../../services/util'

export default {
  name: 'HorizontalText',
  components: {
    'icon': icon
  },
  props: [
    'title',
    'icon',
    'config'
  ],
  data () {
    return {
      data: []
    }
  },
  computed: {
    ...mapGetters([
      'gwb'
    ])
  },
  methods: {
    async updateData () {
      this.data = await util.getLatestConfigCijfers(this.gwb, this.config)
    }
  },
  watch: {
    'gwb' () {
      this.updateData()
    }
  },
  async created () {
    this.updateData()
  }
}

</script>

<style lang="scss" scoped>
  .grid_8 {
    vertical-align: middle;
    align-items: flex-start;
  }
</style>
