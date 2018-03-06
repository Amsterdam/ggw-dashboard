<template>
  <div>
    <span @click="showTooltip">{{text}}</span>

    <!-- Modal Component -->
    <b-modal
      centered
      no-fade
      :ref="id"
      :hide-header="true"
      :hide-footer="true">
      <div @click="hideTooltip" class="text-center">
        <h2>{{text}}</h2>
        <div v-html="content"></div>
      </div>
    </b-modal>
  </div>
</template>

<script>

export default {
  props: [
    'text',
    'content'
  ],
  data () {
    return {
      id: `${this._uid}.tooltip`
    }
  },
  methods: {
    showTooltip () {
      this.$refs[this.id].show()
    },
    hideTooltip () {
      this.$refs[this.id].hide()
    }
  }
}
</script>
