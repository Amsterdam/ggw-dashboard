<template>
  <div class="icon-wrapper">
    <div class="icon-container col-12">
      <img class="icon" :src="`static/icons/${icon}`">
    </div>
    <div v-if="title" class="title col-12">
      {{ title }}
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
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    text-align: center;
  }

  .title {
    font-weight: bold;
    vertical-align: baseline;
  }
}

.icon-container {
  max-width: 8rem;
  margin-bottom: 5px;
  padding-top: 0 !important; //override generic grid blok styling
  justify-content: center;
}

.icon {
  max-width: 100%;
  max-height: 100%;
}
</style>
