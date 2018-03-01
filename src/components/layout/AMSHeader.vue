<!--Example of a component that uses D3-->
<template>
  <div class="row">
    <div class="col-sm-5">
      <header class="ams-header">
        <img class="ams-header__logo ams-header__logo--tall" src="../../../static/logo-tall.svg">
        <h1 class="text-center">Gebied in beeld</h1>
      </header>
    </div>
    <!--<div class="col-sm-3">-->
      <!--<gwb-map></gwb-map>-->
    <!--</div>-->
    <!--<div class="col-sm-4">-->
      <!--<color-legend></color-legend>-->
    <!--</div>-->
  </div>

</template>

<script>
import gwbMap from '../GWBMap'
import colorLegend from '../ColorLegend'

export default {
  name: 'AMSHeader',
  components: {
    'gwb-map': gwbMap,
    'color-legend': colorLegend
  }
}

</script>
