import { shallowMount } from '@vue/test-utils'
import BaseButton from '@/components/vue-gouvfr/BaseButton.vue'

let wrapper = null

const propsData = {
    label: "Titre du bouton",
    isSecondary: true,
    isDisabled: true
}

beforeEach(() => (wrapper = shallowMount(BaseButton, {
    propsData,
})))
afterEach(() => wrapper.destroy())

describe('BaseButton.vue', () => {
    it("displays the mandatory button label", () => {
        expect(wrapper.find('.rf-btn').text()).toBe(propsData.label)
    })
    it("displays the secundary button class", () => {
        expect(wrapper.find('.rf-btn').classes()).toContain('rf-btn--secondary')
    })
    it("has the disabled attribute", () => {
        expect(wrapper.find('.rf-btn').attributes('disabled')).toBe('disabled')
    })

})
