import { shallowMount, createLocalVue } from '@vue/test-utils'
import BaseBreadcrumb from '@/components/vue-gouvfr/BaseBreadcrumb.vue'
import VueRouter from 'vue-router'

let wrapper = null

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

const propsData = {
    links: [{ url: '/path', name: 'path' }, { url: '/path/to', name: 'to' }],
    currentPage: 'current page'
}

beforeEach(() => (wrapper = shallowMount(BaseBreadcrumb, {
    propsData,
    localVue,
    router
})))
afterEach(() => wrapper.destroy())

describe('BaseBreadcrumb.vue', () => {
    it("displays the homepage link first", () => {
        expect(wrapper.findAll('router-link-stub').at(0).attributes("to")).toBe('/')
    })

    it("displays the first link", () => {
        expect(wrapper.findAll('router-link-stub').at(1).attributes("to")).toBe('/path')
        expect(wrapper.findAll('router-link-stub').at(1).text()).toBe('path')
    })
    it("displays the second link", () => {
        expect(wrapper.findAll('router-link-stub').at(2).attributes("to")).toBe('/path/to')
        expect(wrapper.findAll('router-link-stub').at(2).text()).toBe('to')
    })
    it("displays the name of the current page", () => {
        expect(wrapper.find('.rf-breadcrumb__item--current').text()).toBe('current page')
    })

})
