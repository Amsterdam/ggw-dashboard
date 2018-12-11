<template>
  <div>
    <div class="more-info" title="Klik hier voor meer informatie" @click="showTooltip">
      <slot>
        <span v-if="selectedCijfer">{{selectedCijfer.label}}</span>
      </slot>
    </div>

    <!-- Modal Component -->
    <b-modal
      class="tooltip"
      centered
      no-fade
      :ref="id"
      :hide-header="true"
      :hide-footer="true">
        <div class="container">
          <span class="close-modal" @click="hideTooltip" title="Sluiten">X</span>
          <div class="row">
            <div class="tooltip-header col-12">
              <div class="mode_input selectie">
                <div class="label">
                  <label for="dropdown" v-if="selectedCijfer && selectedCijfer.gebied">{{selectedCijfer.gebied.naam}}</label>
                </div>
                <div class="invoer" v-show="cijfers && cijfers.length > 1">
                  <b-form-select @change="selectCijfer"
                                  v-model="selectedLabel"
                                  :options="cijfers || []"
                                  text-field="label"
                                  value-field="label"
                                  id="dropdown">
                  </b-form-select>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div v-if="selectedCijfer && selectedCijfer.tooltip">
                <span class="Notification-grijs">
                  <h2>{{selectedCijfer.label}}</h2>
                  <span v-if="selectedCijfer.recent" class="text-center">
                    {{selectedCijfer.recent.jaar}}: <b>{{selectedCijfer.recent | displaywaarde }}</b>
                  </span>
                </span>
                <div v-html="selectedCijfer.tooltip(false)"></div>
              </div>
            </div>
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
    created () {
      this.updateCijfer()
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
  }
}
</script>

<style lang="scss" scoped>
  @import "~amsterdam-stijl/dist/scss/ams-colorpalette";

  .more-info {
    cursor: pointer;
  }

  .tooltip {
    text-align: left;
    color: $ams-zwart;
  }

  .tooltip-header {
    padding: 15px;
  }

  .close-modal {
    display: inline-block;
    padding: 1rem;
    margin: -1rem;
    cursor: pointer;
    float: right;
  }

  .Notification-grijs {
    padding-left: 0;
    margin-top: 0;
    border: none;
    h2 {
      margin-top: 0;
    }
  }
</style>
