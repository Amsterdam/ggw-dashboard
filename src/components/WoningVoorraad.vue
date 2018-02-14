<template>
  <div>
    <table class="table table-sm borderless">
      <tbody>
      <tr>
        <td width="10%">
          <img src="../../static/icons/wonen_en_leefomgeving.svg">
          Woningvoorraad
        </td>
        <td>
          <horizontal-bar-chart></horizontal-bar-chart>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import horizontalBarChart from './HorizontalBarChart'

export default {
  name: 'WoningVoorraad',
  components: {
    'horizontal-bar-chart': horizontalBarChart
  },
  data () {
    return {
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

<style>
.borderless td, .borderless th {
  border: 0;
}
</style>
