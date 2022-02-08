import { shallowMount } from '@vue/test-utils'
import RelatedLinks from '../components/RelatedLinks'

describe('RelatedLinks', () => {
  let wrapper

  const findCollection = () => wrapper.find('v-collection')
  const findCards = () => wrapper.findAll('v-card')
  const findRelatedLinks = () => wrapper.findComponent(RelatedLinks)

  function createComponent ({ propsData = {} } = {}) {
    const $axios = {
      get: (url) => {
        switch (url) {
          case '/pages/1':
            return Promise.resolve({
              data: {
                id: 1,
                title: 'News Article',
                meta: {
                  type: 'news.ArticlePage'
                },
                ancestry: [{ slug: 'news' }],
                tags: []
              }
            })
          case '/pages/2':
            return Promise.resolve({
              data: {
                id: 2,
                title: 'Dogs',
                meta: {
                  type: 'tagpages.TagPage'
                }
              }
            })
          default:
            return Promise.resolve({})
        }
      }
    }
    wrapper = shallowMount(RelatedLinks, {
      propsData,
      mocks: {
        $axios
      }
    })
  }

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders', () => {
    createComponent()

    expect(findRelatedLinks().exists()).toBe(true)
  })

  it('does not render the collection if there are no links', () => {
    createComponent()

    expect(findCollection().exists()).toBe(false)
  })

  it('renders a collection with title and cards', async () => {
    const title = 'Test Links'
    const links = [
      { type: 'external_link', value: { title: 'Link 1', url: 'http://example.com' } },
      { type: 'cms_page', value: { titleOverride: '', page: 1 } },
      { type: 'cms_page', value: { titleOverride: '', page: 2 } }
    ]

    createComponent({
      propsData: {
        title,
        links
      }
    })

    await RelatedLinks.fetch.call(wrapper.vm)

    expect(findCollection().attributes('title')).toBe(title)
    expect(findCards().length).toBe(3)
    expect(findCards().at(0).attributes('title')).toBe('Link 1')
    expect(findCards().at(1).attributes('title')).toBe('News Article')
    expect(findCards().at(2).attributes('title')).toBe('Dogs')
  })

  it('renders a collection with title overrides', async () => {
    const title = 'Test Links'
    const links = [
      { type: 'cms_page', value: { titleOverride: 'Link 1', page: 1 } },
      { type: 'cms_page', value: { titleOverride: 'Link 2', page: 2 } }
    ]

    createComponent({
      propsData: {
        title,
        links
      }
    })

    await RelatedLinks.fetch.call(wrapper.vm)

    expect(findCards().at(0).attributes('title')).toBe('Link 1')
    expect(findCards().at(1).attributes('title')).toBe('Link 2')
  })
})
