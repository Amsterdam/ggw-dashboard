<!--Example of a component that uses D3-->
<template>
  <div class="row">
    <div class="col-sm-9">
      <header>
        <img src="../../static/logo-tall.svg">
        <h1 class="text-center">Kerncijfers gebiedsgericht werken</h1>
      </header>
    </div>
    <div class="col-sm-3">
      <gwb-map></gwb-map>
    </div>
  </div>

</template>

<script>
import gwbMap from './GWBMap'

export default {
  name: 'AMSHeader',
  components: {
    'gwb-map': gwbMap
  }
}

</script>
