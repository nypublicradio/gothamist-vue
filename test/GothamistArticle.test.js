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
      methods: {
        handleWallImpression: () => {}
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

  it('should not display the content wall on an old article when the utm query string exists and it should set the cookie', () => {
    const utmRoute = { path: 'test', query: { utm_medium: 'nypr-email' } }
    let cookieName = ''
    let cookieValue = ''
    const $cookies = {
      get: () => {},
      set: (name, value) => { cookieName = name; cookieValue = value }
    }
    const article = Object.assign({ updatedDate: String(sub(new Date(), { months: 7 })) }, coronavirusStatistics, {})
    const wrapper = shallowMount(GothamistArticle, {
      propsData: {
        article
      },
      methods: {
        handleWallImpression: () => {}
      },
      mocks: {
        store,
        localVue,
        $route: utmRoute,
        $axios,
        $config,
        $cookies,
        $gtm
      }
    })
    expect(wrapper.find('gothamistwalledarticle-stub').exists()).toBe(false)
    expect(cookieName).toEqual('_gothamistNewsletterMember')
    expect(cookieValue).toEqual('true')
  })
})
