import Vue from 'vue'
import App from '@/App'

xdescribe('AMSHeader.vue', () => {
  it('should render correct contents', () => {
    const cmp = Vue.extend(App) // Create a copy of the original component
    const vm = new cmp({
      data: { // Replace data value with this fake data
        messages: ['Cat']
      }
    }).$mount() // Instances and mounts the component
    expect(vm.messages).toEqual(['Cat'])
    // expect(cmp.vm.messages).toEqual(['Cat'])
    // const Constructor = Vue.extend(AMSHeader)
    // const vm = new Constructor().$mount()
    // expect(vm).toEqual(0)
  })
})
