<template>
  <div class="ams-header">
    <header>
      <img class="ams-header__logo" src="../../../static/logo-short.svg" height="30px">
    </header>
    <span class="header-title"><b>Gebied in beeld</b></span>
  </div>
</template>

<script>

export default {
  name: 'AMSHeader',
  components: {
  }
}

</script>

<style lang="scss" scoped>
  @import "~stijl/scss/ams-breakpoints";

  .header-title {
    margin: .5rem 0;
  }

</style>
