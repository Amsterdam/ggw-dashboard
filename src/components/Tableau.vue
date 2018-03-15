<template>
  <div>
    <div class="rij mode_input text rij_verplicht">
      <div class="label">
        <label for="formInput">Embed url</label>
      </div>

      <div class="invoer">
        <input v-model="src"
               type="text"
               id="formInput"
               class="input"
               placeholder="Voer de url in die moet worden embed">
      </div>
    </div>
    <iframe :src="src"></iframe>
  </div>
</template>

<script>
export default {
  props: [
  ],
  data () {
    return {
      src: 'https://www.youtube.com/embed/tgbNymZ7vqY'
    }
  }
}
</script>

<style scoped>
  iframe {
    width: 100%;
    height: 750px;
  }
</style>
