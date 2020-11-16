import { shallowMount } from '@vue/test-utils'
import Brand from '@/components/france-designsystem/Brand.vue'

let wrapper = null

const propsData = {
    brand_name: "RÉPUBLIQUE<br />FRANÇAISE",
}

beforeEach(() => (wrapper = shallowMount(Brand, { propsData })))
afterEach(() => wrapper.destroy())

describe('Brand.vue', () => {
    it("displays the mandatory brand name", () => {
        expect(wrapper.find('.rf-logo__title').html()).toBe('<span class="rf-logo__title">RÉPUBLIQUE<br>FRANÇAISE</span>')
    })
})
