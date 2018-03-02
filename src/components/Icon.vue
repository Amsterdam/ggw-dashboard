<template>
  <div class="text-center">
    <div>
      <img class="icon" :src="`static/icons/${icon}`">
    </div>
    <div v-if="title" class="title">
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

<style scoped>
.icon {
  width: 60px
}

.title {
  font-weight: bold;
}
</style>
