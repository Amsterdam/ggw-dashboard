<template>
  <div>
    <div class="row">
      <div class="col-sm-4">
        <div class="float-left">
          <div class="text-center">
            <div><img :src="'../../static/icons/' + icon"></div>
            <div class="font-weight-bold">{{title}}</div>
          </div>
        </div>
      </div>
      <div class="col-sm-8">
        <div v-for="d in data" :key="d.label">
          {{d.label}}:
          <span v-if="d.recent">
                {{(d.recent.waarde || "").toLocaleString()}}{{d.post}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../services/util'

export default {
  name: 'HorizontalText',
  components: {
  },
  props: [
    'title',
    'icon',
    'config'
  ],
  data () {
    return {
      data: null
    }
  },
  computed: {
    ...mapGetters([
      'gwb'
    ])
  },
  methods: {
    async updateData () {
      this.data = await util.getLatestConfigCijfers(this.gwb, this.config)
    }
  },
  watch: {
    'gwb' () {
      this.updateData()
    }
  },
  created () {
    this.updateData()
  }
}

</script>

<style>
</style>
