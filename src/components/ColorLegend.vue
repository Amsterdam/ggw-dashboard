<template>
  <div class="col-12">
    <h4>Betekenis kleuren</h4>
    <div class="legend">
      <div v-for="entry in legend" :key="entry.color" class="legend-entry">
        <span :style="getBulletStyle(entry)" class="legend-bullet">&#9634;</span>
        {{ entry.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { CATEGORY_COLORS, COLOR } from '../services/colorcoding'

export default {
  name: 'ColorLegend',
  components: {
  },
  props: [
  ],
  data () {
    return {
      legend: CATEGORY_COLORS
    }
  },
  computed: {
  },
  methods: {
    getBulletStyle (entry) {
      const style = {
        'background-color': entry.color,
        color: entry.color
      }
      if (entry.color === COLOR['ams-wit']) {
        style['border-color'] = COLOR['ams-zwart']
      }
      return style
    }
  },
  watch: {
  },
  created () {
  }
}

</script>

<style lang="scss" scoped>
  @import "~amsterdam-stijl/dist/scss/ams-colorpalette";

  .marge-left {
    margin-left: 1rem;
  }

  h4 {
    margin: 0;
  }

  .legend-entry {
    margin-top: .3rem;
  }

  .legend-bullet {
    letter-spacing: 2px;
    border: 1px solid;
    margin-right: 7px;
  }
</style>
