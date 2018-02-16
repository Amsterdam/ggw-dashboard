<template>
  <div>
    <table class="table table-sm borderless">
      <tbody>
      <tr>
        <td width="10%">
          <img :src="'../../static/icons/' + icon">
          <span class="font-weight-bold">{{title}}</span>
        </td>
        <td>
          <div v-for="d in data" :key="d.label">
            {{d.label}}: {{d.recent.waarde.toLocaleString()}}{{d.post}}
          </div>
        </td>
      </tr>
      </tbody>
    </table>
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
      this.data = await util.getConfigCijfers(this.gwb, this.config)
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
