<template>
  <div>
    <div class="row">
      <div class="col-sm-4">
        <icon :icon="icon" :title="title"></icon>
      </div>
      <div class="col-sm-8">
        <div v-for="d in data" :key="d.label">
          {{d.label}}:
          <span v-if="d.recent"
                v-b-tooltip.hover v-b-tooltip.click v-b-tooltip.left title="">
                {{d.recent | displaywaarde}}
          </span>
        </div>
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

<style>
</style>
