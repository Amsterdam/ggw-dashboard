<template>
  <div>
    <div @click="showTooltip">
      <slot>
        <span v-if="selectedCijfer">{{selectedCijfer.label}}</span>
      </slot>
    </div>

    <!-- Modal Component -->
    <b-modal
      centered
      no-fade
      :ref="id"
      :hide-header="true"
      :hide-footer="true">
      <div>
        <b-form-select v-if="cijfers"
                       @change="selectCijfer"
                       v-model="selectedLabel"
                       :options="cijfers"
                       text-field="label"
                       value-field="label">
        </b-form-select>
        <div v-if="selectedCijfer && selectedCijfer.tooltip"
             @click="hideTooltip"
             class="text-center">
          <h2>{{selectedCijfer.label}}</h2>
          <p v-if="selectedCijfer.recent" class="text-center">
            {{selectedCijfer.recent.jaar}}: {{selectedCijfer.recent | displaywaarde }}
          </p>
          <p v-html="selectedCijfer.tooltip(false)"></p>
        </div>
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
      if (this.cijfer) {
        this.selectCijfer(this.cijfer.label)
      } else if (this.cijfers) {
        this.selectCijfer(this.cijfers[0].label)
      } else {
        this.selectCijfer(null)
      }
    },
    selectCijfer (label) {
      if (this.cijfers) {
        this.selectedCijfer = this.cijfers.find(c => c.label === label)
        this.selectedLabel = this.selectedCijfer.label
      } else {
        this.selectedCijfer = null
        this.selectedLabel = null
      }
    }
  },
  created () {
    this.updateCijfer()
  }
}
</script>
