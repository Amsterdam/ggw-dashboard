<template>
  <div class="block-container">
    <div class="grid-blok grid_4">
      <icon :icon="icon" :title="title"></icon>
    </div>
    <div class="grid-blok grid_8 horizontal-text__content">
      <div v-for="d in data" :key="d.label">
        {{d.label}}:
        <span v-if="d.recent"
              v-b-tooltip.hover v-b-tooltip.click v-b-tooltip.left title="">
          <b>
              {{d.recent | displaywaarde}}
          </b>
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
  // override grid styling for this component
  .card .grid-blok.horizontal-text__content {
    justify-content: center;
    align-items: stretch;
    margin: auto 0;
    padding-top: 0;
    flex-grow: 2;
  }

  .block-container {
    display: flex;
    align-items: left;
    align-self: left;
    justify-content: center;
    width: 100%;
  }
</style>
