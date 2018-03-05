<template>
  <div>
    <div class="icon-container">
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
.icon-container {
  height: 60px;
  margin-bottom: 5px;
}

.icon {
  max-width: 60px;
  max-height: 60px;
}

.title {
  font-weight: bold;
}
</style>
