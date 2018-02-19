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
      <leaflet-example></leaflet-example>
    </div>
  </div>

</template>

<script>
import leafletExample from './LeafletExample'

export default {
  name: 'AMSHeader',
  components: {
    'leaflet-example': leafletExample
  }
}

</script>
