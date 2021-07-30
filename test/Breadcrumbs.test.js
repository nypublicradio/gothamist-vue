import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import VTag from 'nypr-design-system-vue/src/components/VTag'
import Breadcrumbs from '../components/Breadcrumbs'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('Breadcrumbs', () => {
  const breadcrumbs = [
    {
      name: 'breadcrumb',
      slug: 'test'
    }
  ]

  const stubs = {
    VTag
  }

  test('donate url populates', () => {
    const wrapper = mount(Breadcrumbs, {
      stubs,
      propsData: {
        breadcrumbs
      }
    })
    const div = wrapper.find('nuxt-link')
    expect(div.attributes().to).toBe(breadcrumbs[0].slug)
    expect(div.text()).toContain(breadcrumbs[0].name)
  })

  test('it passes basic accessibility tests', async () => {
    const wrapper = mount(Breadcrumbs, {
      stubs,
      propsData: {
        breadcrumbs
      }
    })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
