import Vue from 'vue'
import App from '@/App'

xdescribe('App.vue', () => {
  let Cmp, vm

  it('should render correct contents', () => {
    Cmp = Vue.extend(App) // Create a copy of the original component
    vm = new Cmp({
      data: { // Replace data value with this fake data
        messages: ['Cat']
      }
    }).$mount() // Instances and mounts the component
    expect(vm.messages).toEqual(['Cat'])
  })
})
