import { shallowMount } from '@vue/test-utils'
import BaseSummary from '@/components/vue-gouvfr/BaseSummary.vue'

let wrapper = null

const propsData = {
    anchors: [{ href: "#titre-ancre-1", title: "Titre de l'ancre 1" }, { href: "#titre-ancre-2", title: "Titre de l'ancre 2" }]
}

beforeEach(() => (wrapper = shallowMount(BaseSummary, { propsData })))
afterEach(() => wrapper.destroy())


describe('BaseSummary.vue', () => {
    it("displays the title 'Sommaire'", () => {
        expect(wrapper.find('.rf-summary__title').text()).toBe("Sommaire")
    })
    it("displays the first element's href", () => {
        expect(wrapper.findAll('.rf-summary__list li a').at(0).attributes('href')).toBe(propsData.anchors[0].href)
    })
    it("displays the first element's title", () => {
        expect(wrapper.findAll('.rf-summary__list li').at(0).text()).toBe(propsData.anchors[0].title)
    })
    it("displays the second element's href and title", () => {
        expect(wrapper.findAll('.rf-summary__list li a').at(1).attributes('href')).toBe(propsData.anchors[1].href)
        expect(wrapper.findAll('.rf-summary__list li').at(1).text()).toBe(propsData.anchors[1].title)
    })
})
