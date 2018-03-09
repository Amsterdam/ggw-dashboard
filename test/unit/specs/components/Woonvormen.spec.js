import Vue from 'vue'
import Woonvormen from '@/components/Woonvormen'

xdescribe('Woonvormen.vue', () => {
  it('should render correct contents', () => {
    const Component = Vue.extend(Woonvormen)

    const vm = new Component().$mount() // Instances and mounts the component
    expect(vm.$el).toBeTruthy()
  })
})
