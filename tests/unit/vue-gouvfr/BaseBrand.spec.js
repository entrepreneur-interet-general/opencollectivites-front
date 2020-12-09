import { shallowMount } from '@vue/test-utils'
import BaseBrand from '@/components/vue-gouvfr/BaseBrand.vue'

let wrapper = null

const propsData = {
    brand_name: "RÉPUBLIQUE<br />FRANÇAISE",
}

beforeEach(() => (wrapper = shallowMount(BaseBrand, {
    propsData,
    stubs: ['router-link']
})))
afterEach(() => wrapper.destroy())

describe('BaseBrand.vue', () => {
    it("displays the mandatory brand name", () => {
        expect(wrapper.find('.rf-logo__title').html()).toBe('<span class="rf-logo__title">RÉPUBLIQUE<br>FRANÇAISE</span>')
    })
})
