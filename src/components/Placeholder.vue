<template>
  <div :style="'height: ' + height + 'px'">
    <div class="text-center">
      <img v-if="pic" :src="'../../static/placeholders/' + pic">
      <div v-else>{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title',
    'height',
    'pic'
  ]
}
</script>

<style scoped>
  img {
    max-height: 100%;
    height: 100%;
  }
</style>
