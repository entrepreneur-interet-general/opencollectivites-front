import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/vue-gouvfr/Footer.vue'
import Brand from '@/components/vue-gouvfr/Brand.vue'

let wrapper = null

const propsData = {
    brand_name: "RÉPUBLIQUE<br />FRANÇAISE",
}

beforeEach(() => (wrapper = shallowMount(Footer, {
    propsData,
    stubs: ['router-link']
})))
afterEach(() => wrapper.destroy())

describe('Footer.vue', () => {
    it("calls the mandatory brand component with the Footer class", () => {
        expect(wrapper.findComponent(Brand).props("isHeader")).toBe(false)
    })
})