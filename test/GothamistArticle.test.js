import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { differenceInMonths, sub } from 'date-fns'
import { coronavirusStatistics } from './story-data'
import { state } from './fake-data'
import GothamistArticle from '../components/GothamistArticle'

const localVue = createLocalVue()

localVue.use(Vuex)
describe('GothamistArticle', () => {
  const $route = { fullPath: 'test' }
  const $axios = { get: () => Promise.resolve({}) }
  const $config = { imageBase: '' }
const $gtm = { push: () => { /* do nothing */ } }

  let store = {}

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
    const article = Object.assign(coronavirusStatistics, { updatedDate: String(sub(new Date(), { months: 7 })) }, {})
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

  it('should not display the content wall on a current article', () => {
    const $cookies = { get: () => '' }
    const article = Object.assign(coronavirusStatistics, { updatedDate: String(new Date()) }, {})
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
  it('should not display the content wall on an old article when the subscriber cookie exists', () => {
    const $cookies = {
      get: (c) => { return c === '_gothamistNewsletterMember' ? 'true' : null }
    }
    const article = Object.assign(coronavirusStatistics, { updatedDate: String(sub(new Date(), { months: 7 })) }, {})
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
