import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/france-designsystem/Footer.vue'
import Brand from '@/components/france-designsystem/Brand.vue'

let wrapper = null

const propsData = {
    brand_name: "RÉPUBLIQUE<br />FRANÇAISE",
}

beforeEach(() => (wrapper = shallowMount(Footer, { propsData })))
afterEach(() => wrapper.destroy())

describe('Footer.vue', () => {
    it("calls the mandatory brand component with the Footer class", () => {
        expect(wrapper.findComponent(Brand).props("isHeader")).toBe(false)
    })
})