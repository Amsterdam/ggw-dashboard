<template>
  <div class="grid-zone grid_12 z-kolom1-4_1 breakout-zone hasbgcolor bgcolor_superlightgrey fullwidth">
    <h4>Betekenis kleuren</h4>
    <div class="legend">
      <div v-for="entry in legend" :key="entry.color" class="legend-entry">
        <span :style="getBulletStyle(entry)" class="legend-bullet">&#9634;</span>
        {{entry.text}}
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

<style lang="scss">
  @import '~stijl/src/styles/generic/ams-colorpalette';

  .legend {
    display: flex;
    flex-wrap: wrap;
  }

  .legend-entry {
    margin-top: 7px;
    display: flex;
    width: 33%;
  }

  .legend-bullet {
    letter-spacing: 2px;
    border: 1px solid;
    margin-right: 7px;
  }

  .fullwidth {
    box-shadow: 50vw 0 0 0 $ams-top-menu, -50vw 0 0 0 $ams-top-menu;
  }

</style>
