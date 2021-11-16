import { mount, RouterLinkStub } from '@vue/test-utils'
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
    VTag,
    NuxtLink: RouterLinkStub
  }

  const config = {
    stubs,
    propsData: {
      breadcrumbs
    }
  }

  test('donate url populates', () => {
    const wrapper = mount(Breadcrumbs, config)
    const div = wrapper.find('a')
    expect(div.text()).toContain(breadcrumbs[0].name)
  })

  test('it passes basic accessibility tests', async () => {
    const wrapper = mount(Breadcrumbs, config)
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
