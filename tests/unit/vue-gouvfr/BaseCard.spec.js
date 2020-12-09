import { shallowMount } from '@vue/test-utils'
import BaseCard from '@/components/vue-gouvfr/BaseCard.vue'

let wrapper = null

const propsData = {
  card_data: {
    title: "Test card",
    image: { src: "/img/placeholder.jpg", alt: "Test image" },
    url: "https://test.com",
    description: "Test description",
    detail: "Test detail",
  }
}

beforeEach(() => (wrapper = shallowMount(BaseCard, { propsData })))
afterEach(() => wrapper.destroy())


describe('BaseCard.vue', () => {
  describe('Card content', () => {
    it("displays the card's title", () => {
      expect(wrapper.find('.rf-card__lead').text()).toMatch(propsData.card_data.title)
    })

    it("displays the card's description", () => {
      expect(wrapper.find('.rf-card__desc').text()).toMatch(propsData.card_data.description)
    })

    it("displays the card's detail", () => {
      expect(wrapper.find('.rf-card__detail').text()).toMatch(propsData.card_data.detail)
    })

    it("links to the card's url", () => {
      expect(wrapper.find('.rf-card__link').attributes('href')).toBe(propsData.card_data.url)
    })

    it("shows the image", () => {
      expect(wrapper.find('.rf-card__img img').attributes('src')).toBe(propsData.card_data.image.src)
    })

    it("has the image's title text", () => {
      expect(wrapper.find('.rf-card__img img').attributes('title')).toBe(propsData.card_data.image.alt)
    })

    it("has the image's alt text", () => {
      expect(wrapper.find('.rf-card__img img').attributes('alt')).toBe(propsData.card_data.image.alt)
    })
  })

  describe('Card options', () => {
    it("does not show an arrow by default", () => {
      expect(wrapper.find('.rf-card').classes()).toContain('rf-card--no-arrow')
    })

    it("is vertical by default", () => {
      expect(wrapper.find('.rf-card').classes()).toEqual(expect.not.arrayContaining(['rf-card--horizontal']))
    })
  })
})