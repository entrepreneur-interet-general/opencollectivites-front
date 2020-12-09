import { shallowMount } from '@vue/test-utils'
import BaseTile from '@/components/vue-gouvfr/BaseTile.vue'

let wrapper = null

const propsData = {
  tile_data: {
    title: "Test title",
    image: { src: "/img/placeholder.jpg", alt: "Test image" },
    url: "https://test.com",
  }
}

beforeEach(() => (wrapper = shallowMount(BaseTile, { propsData })))
afterEach(() => wrapper.destroy())


describe('BaseTile.vue', () => {
  describe('Tile content', () => {
    it("displays the tile's title", () => {
      expect(wrapper.find('.rf-tile__title').text()).toMatch(propsData.tile_data.title)
    })

    it("links to the tile's url", () => {
      expect(wrapper.find('.rf-tile__link').attributes('href')).toBe(propsData.tile_data.url)
    })

    it("shows the image", () => {
      expect(wrapper.find('.rf-tile__img img').attributes('src')).toBe(propsData.tile_data.image.src)
    })

    it("has the image's title text", () => {
      expect(wrapper.find('.rf-tile__img img').attributes('title')).toBe(propsData.tile_data.image.alt)
    })

    it("has the image's alt text", () => {
      expect(wrapper.find('.rf-tile__img img').attributes('alt')).toBe(propsData.tile_data.image.alt)
    })
  })

  describe('Tile options', () => {
    it("is vertical by default", () => {
      expect(wrapper.find('.rf-tile').classes()).toEqual(expect.not.arrayContaining(['rf-tile--horizontal']))
    })
  })
})