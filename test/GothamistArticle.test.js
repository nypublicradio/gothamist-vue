import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { sub } from 'date-fns'
import GothamistArticle from '../components/GothamistArticle'
import { coronavirusStatistics } from './story-data'
import { state } from './fake-data'

const localVue = createLocalVue()

localVue.use(Vuex)
describe('GothamistArticle', () => {
  const $route = { fullPath: 'test' }
  const $axios = { get: () => Promise.resolve({}) }
  const $config = { imageBase: '' }
  const $gtm = { push: () => {} }

  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        global: {
          state,
          namespaced: true
        }
      }
    })
  })

  it('should render', () => {
    const $cookies = { get: () => '' }
    const wrapper = shallowMount(GothamistArticle, {
      store,
      localVue,
      propsData: {
        article: coronavirusStatistics
      },
      mocks: {
        $route,
        $axios,
        $config,
        $cookies,
        $gtm
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should display the content wall on an old article', () => {
    const $cookies = { get: () => '' }
    const article = Object.assign({ updatedDate: String(sub(new Date(), { months: 7 })) }, coronavirusStatistics, {})
    const wrapper = shallowMount(GothamistArticle, {
      store,
      localVue,
      propsData: {
        article
      },
      mocks: {
        $route,
        $axios,
        $config,
        $cookies,
        $gtm
      }
    })
    expect(wrapper.find('gothamistwalledarticle-stub').exists()).toBe(true)
  })

  it('should not display the content wall on an old article when the subscriber cookie exists', () => {
    const $cookies = {
      get: (c) => { if (c === '_gothamistNewsletterMember') { return 'true' } }
    }
    const article = Object.assign({ updatedDate: String(sub(new Date(), { months: 7 })) }, coronavirusStatistics, {})
    const wrapper = shallowMount(GothamistArticle, {
      store,
      localVue,
      propsData: {
        article
      },
      mocks: {
        $route,
        $axios,
        $config,
        $cookies,
        $gtm
      }
    })
    expect(wrapper.find('gothamistwalledarticle-stub').exists()).toBe(false)
  })
})
