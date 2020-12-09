import { shallowMount } from '@vue/test-utils'
import TheHeader from '@/components/vue-gouvfr/TheHeader.vue'
import BaseBrand from '@/components/vue-gouvfr/BaseBrand.vue'

let wrapper = null

const propsData = {
    brand_name: "RÉPUBLIQUE<br />FRANÇAISE",
    service_name: "Test service",
    tagline: "Test tagline",
    tools: {
        dark_mode: true,
        items: [{ url: "https://test.com", name: "Test tool", icon: "rf-fi-add-circle-line" }],
        search_bar: {
            label: "Label de la barre de recherche"
        }
    }
}

beforeEach(() => (wrapper = shallowMount(TheHeader, {
    propsData,
    stubs: ['router-link']
})))
afterEach(() => wrapper.destroy())

describe('TheHeader.vue', () => {
    describe('Header content', () => {
        it("calls the mandatory brand component with the Header class", () => {
            expect(wrapper.findComponent(BaseBrand).props("isHeader")).toBe(true)
        })

        it("displays an optional service name", () => {
            expect(wrapper.find('.rf-service__title').text()).toMatch(propsData.service_name)
        })

        it("displays an optional tagline", () => {
            expect(wrapper.find('.rf-service__tagline').text()).toMatch(propsData.tagline)
        })

        it("displays the toolbar if tool contain items", () => {
            const targetItem = wrapper.findAll('.rf-shortcuts__item').at(1).find('a')
            expect(targetItem.text()).toMatch(propsData.tools.items[0].name)
            expect(targetItem.attributes('href')).toBe(propsData.tools.items[0].url)
            expect(targetItem.classes()).toContain(propsData.tools.items[0].icon)
        })

        it("displays the dark mode switch is the option is true", () => {
            expect(wrapper.find('#rf-dark-mode-toggle-switch').attributes('name')).toMatch("rf-dark-mode-toggle-switch")
        })

        it("displays the search bar if activated", () => {
            expect(wrapper.find(".rf-search-bar label").text()).toMatch(propsData.tools.search_bar.label)
        })
    })
})
