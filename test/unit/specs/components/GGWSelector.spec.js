import Vue from 'vue'
import GGWSelector from '@/components/layout/GGWSelector'

xdescribe('GGWSelector.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(GGWSelector)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).toContain('Gebied')
  })
})
