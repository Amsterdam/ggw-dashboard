<template>
    <div class="loading-component">
      <transition name="fade">
        <div class="page-overlay" v-if="!simple && showSpinner">
          <div class="progress-wrapper">
            <div class="progress-indicator progress-red"></div>
            <div class="progress-txt">Laden...</div>
          </div>
        </div>
        <div class="progress-indicator progress-red" v-if="simple"></div>
      </transition>
    </div>
</template>

<script>
import { HTTPStatus } from '../services/datareader'

export default {
  name: 'LoadingComponent',
  components: {
  },
  props: {
    simple: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      HTTPStatus,
      showSpinner: false
    }
  },
  methods: {
    shouldShowSpinner (pending) {
      if (pending > 0) {
        clearTimeout(this.spinnerHideTimeout)
        this.showSpinner = true
      } else {
        this.spinnerHideTimeout = setTimeout(() => {
          this.showSpinner = false
        }, 300)
      }
    }
  },
  watch: {
    'HTTPStatus.pending': function (pending) {
      this.shouldShowSpinner(pending)
    }
  }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active {
    transition: opacity .2s ease-out;
  }

  .fade-leave-active {
    transition: opacity .3s ease-in;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
