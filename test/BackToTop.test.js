import { shallowMount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import BackToTop from '../components/BackToTop'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('BackToTop', () => {
  test('it passes basic accessibility tests', async () => {
    const wrapper = shallowMount(BackToTop)
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
