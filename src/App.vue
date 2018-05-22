<template>
  <div id="app">
    <div class="container-fluid">
      <ams-header>Header</ams-header>
    </div>
    <div class="sticky-top">
      <ggw-selector></ggw-selector>
    </div>

    <div class="container">
      <router-view></router-view>
    </div>

    <loading-component></loading-component>
    <div class="container-fluid" v-if="gwb && meta && thema && !HTTPStatus.pending">
      <div class="row bg-darkgrey footer">
        <meer-cijfers-en-informatie></meer-cijfers-en-informatie>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { HTTPStatus } from './services/datareader'

import amsHeader from './components/layout/AMSHeader'
import ggwSelector from './components/layout/GGWSelector'
import meerCijfersEnInformatie from './components/MeerCijfersEnInformatie'
import loadingComponent from './components/LoadingComponent'

export default {
  name: 'App',
  components: {
    'ams-header': amsHeader,
    'ggw-selector': ggwSelector,
    'meer-cijfers-en-informatie': meerCijfersEnInformatie,
    'loading-component': loadingComponent
  },
  data () {
    return {
      HTTPStatus
    }
  },
  computed: {
    ...mapGetters([
      'gwb',
      'meta',
      'thema'
    ])
  }
}
</script>
