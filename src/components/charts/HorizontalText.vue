<template>
  <div class="block-container">
    <div class="col-lg-4 horizontal-text__icon">
      <icon :icon="icon" :title="title"></icon>
    </div>
    <div class="col-lg-8 horizontal-text__content">
      <p v-if="caption">
        <small>{{caption}}</small>
      </p>

      <div v-for="d in data" :key="d.label">
        <tooltip :cijfers="data" :cijfer="d">
          {{d.label}}:
          <span v-if="d.recent">
            <b>
                {{d.recent | displaywaarde}}
            </b>
          </span>
        </tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import tooltip from '../Tooltip'
import icon from '../Icon'
import util from '../../services/util'

export default {
  name: 'HorizontalText',
  components: {
    icon: icon,
    tooltip: tooltip
  },
  props: [
    'title',
    'icon',
    'config',
    'caption'
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
  created () {
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
    padding-bottom: 10px;
  }
</style>
