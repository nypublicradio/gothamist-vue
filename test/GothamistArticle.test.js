import { createLocalVue, shallowMount } from '@vue/test-utils'
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
  const $gtm = { push: () => { /* do nothing */ } }
  const currentDate = String(new Date())
  const oldDate = String(sub(new Date(), { months: 7 }))

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
    const article = Object.assign({}, coronavirusStatistics, { publishedDate: oldDate, updatedDate: oldDate })
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

  it('should not display the content wall on an new article 1', () => {
    const $cookies = { get: () => '' }
    const article = Object.assign({}, coronavirusStatistics, { publishedDate: null, modifiedDate: null })
    article.meta = Object.assign({}, coronavirusStatistics.meta, { firstPublishedAt: currentDate })
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

  it('should not display the content wall on an new article 2', () => {
    const $cookies = { get: () => '' }
    const article = Object.assign({}, coronavirusStatistics, { publishedDate: currentDate, modifiedDate: null })
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

  it('should not display the content wall on an updated article', () => {
    const $cookies = { get: () => '' }
    const article = Object.assign({}, coronavirusStatistics, { publishedDate: oldDate, updatedDate: currentDate })
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
    const article = Object.assign({}, coronavirusStatistics, { updatedDate: oldDate })
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

  it('should not display the content wall on an old article when coming from an email link', () => {
    const $cookies = { get: () => { /* no cookies */ } }
    const utmRoute = { fullPath: 'test', query: { utm_source: 'nypr-email' } }
    const article = Object.assign({}, coronavirusStatistics, { updatedDate: oldDate })
    const wrapper = shallowMount(GothamistArticle, {
      store,
      localVue,
      propsData: {
        article
      },
      mocks: {
        $route: utmRoute,
        $axios,
        $config,
        $cookies,
        $gtm
      }
    })
    expect(wrapper.find('gothamistwalledarticle-stub').exists()).toBe(false)
  })

  it('should not display the content wall on an old article when the passThrough param is on', () => {
    const $cookies = { get: () => { /* no cookies */ } }
    const passThroughRoute = { fullPath: 'test', query: { passThrough: 'true' } }
    const article = Object.assign({}, coronavirusStatistics, { updatedDate: oldDate })
    const wrapper = shallowMount(GothamistArticle, {
      store,
      localVue,
      propsData: {
        article
      },
      mocks: {
        $route: passThroughRoute,
        $axios,
        $config,
        $cookies,
        $gtm
      }
    })
    expect(wrapper.find('gothamistwalledarticle-stub').exists()).toBe(false)
  })
})
