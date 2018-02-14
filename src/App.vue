<template>
  <div id="app" class="app container-fluid">
    <ams-header>Header</ams-header>
    <router-view/>
  </div>
</template>

<script>
import amsHeader from './components/AMSHeader'

export default {
  name: 'App',
  components: {
    'ams-header': amsHeader
  }
}
</script>

<!-- Global styling -->
<style lang="scss">
  @import "../static/ams.scss";

  .app {
    margin-top: 5px;
  }
</style>
