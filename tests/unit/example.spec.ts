import { mount } from '@vue/test-utils'
import HomePage from '../../src/views/StartPage.vue'
import { describe, expect, test } from 'vitest'

describe('StartPage.vue', () => {
  test('renders home vue', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.text()).toMatch('Ready to create an app?')
  })
})
