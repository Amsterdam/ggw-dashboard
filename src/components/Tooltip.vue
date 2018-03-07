<template>
  <div>
    <div @click="showTooltip">
      <slot>
        {{selectedCijfer && selectedCijfer.label}}
      </slot>
    </div>

    <!-- Modal Component -->
    <b-modal
      centered
      no-fade
      :ref="id"
      :hide-header="true"
      :hide-footer="true">
      <div v-if="cijfers">
        <b-form-select @change="selectCijfer"
                     v-model="selectedLabel"
                     :options="cijfers"
                     text-field="label"
                     value-field="label">
        </b-form-select>
      </div>
      <div v-if="selectedCijfer && selectedCijfer.tooltip" @click="hideTooltip" class="text-center">
        <div v-html="selectedCijfer.tooltip(true)"></div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: [
    'cijfers',
    'cijfer'
  ],
  data () {
    return {
      id: `${this._uid}.tooltip`,
      selectedLabel: null,
      selectedCijfer: null
    }
  },
  methods: {
    showTooltip () {
      this.updateCijfer()
      this.$refs[this.id].show()
    },
    hideTooltip () {
      this.$refs[this.id].hide()
    },
    updateCijfer () {
      if (this.cijfers) {
        if (this.cijfer) {
          this.selectCijfer(this.cijfer.label)
        } else {
          this.selectCijfer(this.cijfers[0].label)
        }
      }
    },
    selectCijfer (label) {
      console.log('selectCijfer', label)
      this.selectedCijfer = this.cijfers.find(c => c.label === label)
      this.selectedLabel = this.selectedCijfer.label
    },
    created () {
      this.updateCijfer()
    }
  }
}
</script>
