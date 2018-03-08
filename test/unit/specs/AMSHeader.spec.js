import Vue from 'vue'
import Icon from '@/components/Icon'

describe('AMSHeader.vue', () => {
  it.only('should render correct contents', () => {
    const Component = Vue.extend(Icon)

    const vm = new Component({
      propsData: {
        title: 'MyTitle',
        icon: 'Icon'
      }
    }).$mount() // Instances and mounts the component
    expect(vm.$el.textContent).toContain('MyTitle')
  })
})
