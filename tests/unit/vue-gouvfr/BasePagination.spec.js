import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import BasePagination from '@/components/vue-gouvfr/BasePagination.vue'


const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

let wrapper = null

const propsData = {
    numberOfPages: 15,
}

beforeEach(() => (wrapper = shallowMount(BasePagination, {
    propsData,
    localVue,
    router
})))

afterEach(() => wrapper.destroy())

describe('BasePagination.vue', () => {
    it("Has the first link corresponding to the 'First' option", () => {
        expect(wrapper.findAll('router-link-stub').at(0).attributes('title')).toBe("Première page")
    })
    it("Has the second link corresponding to the 'Previous' option", () => {
        expect(wrapper.findAll('router-link-stub').at(1).attributes('title')).toBe("Page précédente")
    })
    it("Has the last link corresponding to the 'Last' option", () => {
        expect(wrapper.findAll('router-link-stub').at(-1).attributes('title')).toBe("Dernière page")
    })
    it("Has the second to last link corresponding to the 'Next' option", () => {
        expect(wrapper.findAll('router-link-stub').at(-2).attributes('title')).toBe("Page suivante")
    })
    it("Has the third link corresponding to the first page", () => {
        expect(wrapper.findAll('router-link-stub').at(2).text()).toBe('1')
    })
    it("Has the fourth link corresponding to the second page", () => {
        expect(wrapper.findAll('router-link-stub').at(3).text()).toBe('2')
    })
    it("Has the fourth to last link corresponding to the number of pages minus one", () => {
        expect(wrapper.findAll('router-link-stub').at(-4).text()).toBe('14')
    })
    it("Has the third to last link corresponding to the number of pages", () => {
        expect(wrapper.findAll('router-link-stub').at(-3).text()).toBe('15')
    })
    it("Has the middle item be a '…' separator", () => {
        expect(wrapper.findAll('.rf-pagination__item').at(4).text()).toBe('…')
    })
    it("Has page 1 selected by default, and so the 'First' and 'Previous' disabled", () => {
        expect(wrapper.find('.rf-pagination__item--active').text()).toBe("1")
        expect(wrapper.findAll('.rf-pagination__item').at(0).classes()).toContain('rf-pagination__item--disabled')
        expect(wrapper.findAll('.rf-pagination__item').at(1).classes()).toContain('rf-pagination__item--disabled')
    })

})
