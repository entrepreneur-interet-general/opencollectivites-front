import { shallowMount } from '@vue/test-utils'
import BaseSelect from '@/components/vue-gouvfr/BaseSelect.vue'

let wrapper = null

const basicOptions = [
    { value: 1, text: "Option 1" },
    { value: 2, text: "Option 2" },
    { value: 3, text: "Option 3" },
]

const groupedOptions = [
    {
        groupName: "optGroup1",
        items: [
            { value: 11, text: "Group1 Option 1" },
            { value: 12, text: "Group1 Option 2" },
            { value: 13, text: "Group1 Option 3" },
        ]

    },
    {
        groupName: "optGroup2",
        items: [
            { value: 21, text: "Group2 Option 1" },
            { value: 22, text: "Group2 Option 2" },
            { value: 23, text: "Group2 Option 3" },
        ]

    },
]

let propsDataBasic = {
    select_data: {
        label: "Test Select",
        description: "Test description",
        options: basicOptions,
    },
}

let propsDataDisabled = {
    ...propsDataBasic,
    isDisabled: true,
}
let propsDataError = {
    ...propsDataBasic,
    isError: true,
    error_message: "Test error message"
}

let propsDataValid = {
    ...propsDataBasic,
    isValid: true,
    validation_message: "Test validation message"
}

let propsDataGrouped = {
    select_data: {
        label: "Test Select",
        description: "Test description",
        optionGroups: groupedOptions,
    },
}

afterEach(() => wrapper.destroy())

describe('BaseSelect.vue', () => {
    describe('Basic use', () => {
        beforeEach(() => (wrapper = shallowMount(BaseSelect, { propsData: propsDataBasic })))

        it("displays the label", () => {
            expect(wrapper.find('.rf-label').text()).toBe(propsDataBasic.select_data.label)
        })
        it("displays an optional description", () => {
            expect(wrapper.find('#select-hint-desc-hint').text()).toBe(propsDataBasic.select_data.description)
        })
        it("displays a default option", () => {
            expect(wrapper.findAll('option').at(0).text()).toBe("- Select -")
        })
        it("displays the option text", () => {
            expect(wrapper.findAll('option').at(1).text()).toBe(basicOptions[0].text)
        })
        it("has the option value", () => {
            expect(wrapper.findAll('option').at(1).attributes("value")).toBe("1")
        })
    })
    describe('Modifier classes', () => {
        it("is disabled when isDisabled is true", () => {
            wrapper = shallowMount(BaseSelect, { propsData: propsDataDisabled })
            expect(wrapper.find('.rf-select').element.disabled).toBe(true)
        })
        it("has the error class when isError is true", () => {
            wrapper = shallowMount(BaseSelect, { propsData: propsDataError })
            expect(wrapper.find('.rf-select').classes()).toContain("rf-select--error")
        })
        it("displays the error message when isError is true", () => {
            wrapper = shallowMount(BaseSelect, { propsData: propsDataError })
            expect(wrapper.find('#select-error-desc-error').text()).toBe(propsDataError.error_message)
        })
        it("has the valid class when isValid is true", () => {
            wrapper = shallowMount(BaseSelect, { propsData: propsDataValid })
            expect(wrapper.find('.rf-select').classes()).toContain("rf-select--valid")
        })
        it("displays the validation message when isValid is true", () => {
            wrapper = shallowMount(BaseSelect, { propsData: propsDataValid })
            expect(wrapper.find('#select-valid-desc-valid').text()).toBe(propsDataValid.validation_message)
        })
    })
    describe('Use with option groups', () => {
        beforeEach(() => (wrapper = shallowMount(BaseSelect, { propsData: propsDataGrouped })))
        it("displays the option group label", () => {
            expect(wrapper.findAll('optgroup').at(0).attributes("label")).toBe(propsDataGrouped.select_data.optionGroups[0].groupName)
        })
        it("displays the option text", () => {
            expect(wrapper.findAll('option').at(1).text()).toBe(propsDataGrouped.select_data.optionGroups[0].items[0].text)
        })
        it("has the option value", () => {
            expect(wrapper.findAll('option').at(1).attributes("value")).toBe("11")
        })
    })
})
