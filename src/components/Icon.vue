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
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.icon {
  max-width: 60px;
  max-height: 60px;
}

.title {
  text-align: center;
  font-weight: bold;
}
</style>
