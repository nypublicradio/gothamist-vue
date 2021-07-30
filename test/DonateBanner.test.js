import { mount, createLocalVue } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import Vuex from 'vuex'
import VButton from 'nypr-design-system-vue/src/components/VButton'
import DonateBanner from '../components/DonateBanner'
import axe from './axe-helper'
import { state } from './fake-data'

const localVue = createLocalVue()
localVue.use(Vuex)

expect.extend(toHaveNoViolations)

describe('DonateBanner', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        myModule: {
          state,
          namespaced: true
        }
      }
    })
  })

  const stubs = {
    VButton
  }

  test('donate url populates', () => {
    const wrapper = mount(DonateBanner, {
      stubs,
      store,
      localVue,
      computed: {
        donateUrl: () => state().donateUrl
      }
    })
    const div = wrapper.find('.donate-banner-button')
    expect(div.attributes('href')).toBe(state().donateUrl)
  })

  test('closeBanner function works and triggers emitted event', async () => {
    const wrapper = mount(DonateBanner, {
      stubs,
      store,
      localVue
    })
    expect(wrapper.vm.active).toBe(true)
    wrapper.vm.closeBanner()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.active).toBe(false)
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  test('donate click triggers emitted event', () => {
    const wrapper = mount(DonateBanner, {
      stubs,
      store,
      localVue,
      computed: {
        donateUrl: () => state().donateUrl
      }
    })
    wrapper.find('.donate-banner-button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('donate-click')
  })

  test('it passes basic accessibility tests', async () => {
    const wrapper = mount(DonateBanner, {
      stubs,
      store,
      localVue,
      computed: {
        donateUrl: () => state().donateUrl
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
