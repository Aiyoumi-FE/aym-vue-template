import Vue from 'vue'
import Home from '@/module/home'

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello').textContent)
      .toEqual('hello world')
  })
})
