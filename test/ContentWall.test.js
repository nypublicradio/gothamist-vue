import { shallowMount } from '@vue/test-utils'
import ContentWall from '../components/ContentWall'

describe('ContentWall', () => {
  let component = {}

  beforeEach(() => {
    component = shallowMount(ContentWall, {
      slots: {
        full: '<div class="full">Content</div>',
        leadin: '<div class="leadin">Co</div>'
      },
      scopedSlots: {
        wall: '<button class="wall" v-on:click="props.dismiss">see full</button>'
      }
    })
  })

  it('Shows the leadin content', () => {
    const leadin = component.find('.leadin')
    expect(leadin.exists()).toBe(true)
  })
  it('Shows the wall', () => {
    const wall = component.find('.wall')
    expect(wall.exists()).toBe(true)
  })
  it('Hides the full content', () => {
    const full = component.find('.full')
    expect(full.exists()).toBe(false)
  })

  it('Shows the full content when you dismiss the wall', async () => {
    const wall = component.find('.wall')
    await wall.trigger('click')
    const full = component.find('.full')
    expect(full.exists()).toBe(true)
  })
})
