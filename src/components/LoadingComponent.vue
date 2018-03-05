<template>
    <div class="loading-component">
      <div class="progress-wrapper" v-if="!simple">
        <div class="progress-indicator progress-red"></div>
        <div class="progress-txt">Laden...</div>
      </div>
      <div class="progress-indicator progress-red" v-if="simple"></div>
    </div>
</template>

<script>
  export default {
    name: 'LoadingComponent',
    components: {
    },
    props: {
      simple: {
        default: false,
        type: Boolean
      }
    }
  }
</script>

<style lang="scss" scoped>
  .loading-component {
    text-align: center;
  }

  .progress-wrapper {
    margin: 1rem;
    background-color: white;
    z-index: 99999;
  }
</style>
