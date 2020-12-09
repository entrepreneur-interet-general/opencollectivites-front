import { shallowMount } from '@vue/test-utils'
import BaseSearchbar from '@/components/vue-gouvfr/BaseSearchbar.vue'

let wrapper = null

const propsData = {
    label: "Test de recherche",
    placeholder: "Test de placeholder",
    isLarge: true
}

beforeEach(() => (wrapper = shallowMount(BaseSearchbar, { propsData })))
afterEach(() => wrapper.destroy())


describe('BaseSearchbar.vue', () => {
    it("displays the search bar's label", () => {
        expect(wrapper.find('.rf-label').text()).toMatch(propsData.label)
    })
    it("displays the search bar's placeholder", () => {
        expect(wrapper.find('.rf-input').attributes("placeholder")).toMatch(propsData.placeholder)
    })
    it("uses the Large version if isLarge is true", () => {
        expect(wrapper.find('.rf-search-bar').classes()).toContain('rf-search-bar--lg')
        expect(wrapper.find('.rf-search-bar').attributes("id")).toBe('search-input--lg')
    })

})