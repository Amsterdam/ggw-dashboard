<template>
  <div class="icon-wrapper">
    <div class="icon-container grid-blok grid_12">
      <img class="icon" :src="`static/icons/${icon}`">
    </div>
    <div v-if="title" class="title grid-blok grid_12 pad-top-bottom">
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'icon',
    'title'
  ]
}
</script>

<style lang="scss" scoped>
.icon-wrapper {
  * {
    text-align: center;
  }

  .title {
    font-weight: bold;
    vertical-align: baseline;
  }
}

.icon-container {
  height: 100px;
  margin-bottom: 5px;
}

.icon {
  max-width: 100%;
  max-height: 100%;
  min-width: 100px;
}
</style>
