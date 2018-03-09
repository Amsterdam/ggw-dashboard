import Vue from 'vue'
import Dashboard from '@/components/layout/Dashboard'

xdescribe('Dashboard.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Dashboard)
    const vm = new Constructor().$mount()
    expect(vm).toBeTruthy()
  })
})
