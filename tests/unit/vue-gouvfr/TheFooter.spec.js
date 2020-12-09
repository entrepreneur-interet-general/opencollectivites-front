import { shallowMount } from '@vue/test-utils'
import TheFooter from '@/components/vue-gouvfr/TheFooter.vue'
import BaseBrand from '@/components/vue-gouvfr/BaseBrand.vue'

let wrapper = null

const propsData = {
    brand_name: "RÉPUBLIQUE<br />FRANÇAISE",
}

beforeEach(() => (wrapper = shallowMount(TheFooter, {
    propsData,
    stubs: ['router-link']
})))
afterEach(() => wrapper.destroy())

describe('TheFooter.vue', () => {
    it("calls the mandatory brand component with the Footer class", () => {
        expect(wrapper.findComponent(BaseBrand).props("isHeader")).toBe(false)
    })
})