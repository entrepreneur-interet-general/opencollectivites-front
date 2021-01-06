import { shallowMount } from '@vue/test-utils'
import BaseCallout from '@/components/vue-gouvfr/BaseCallout.vue'

let wrapper = null

const propsData = {
  title: "Title test",
  text: "Text test",
  buttonLabel: "Button test"
}

beforeEach(() => (wrapper = shallowMount(BaseCallout, {
  propsData,
})))
afterEach(() => wrapper.destroy())

describe('BaseCallout.vue', () => {
  it("displays the mandatory text", () => {
    expect(wrapper.find('.rf-callout__text').text()).toBe('Text test')
  })

  it("displays the optional title", () => {
    expect(wrapper.find('.rf-callout__title').text()).toBe('Title test')
  })

  it("displays the optional button", () => {
    expect(wrapper.find('.rf-btn').exists()).toBe(true)
  })

  it("displays the optional button's label", () => {
    expect(wrapper.find('.rf-btn').text()).toBe("Button test")
  })
})
