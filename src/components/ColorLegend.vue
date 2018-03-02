<template>
  <div>
    <div>Betekenis kleuren:</div>
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

<style>
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
</style>
