import Vue from 'vue'
import Woonvormen from '@/components/Woonvormen'

describe('Woonvormen.vue', () => {
  it.only('should render correct contents', () => {
    const Component = Vue.extend(Woonvormen)

    const vm = new Component().$mount() // Instances and mounts the component
    expect(vm.$el).toBeTruthy()
  })
})
