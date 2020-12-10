import { shallowMount } from '@vue/test-utils'
import BaseTable from '@/components/vue-gouvfr/BaseTable.vue'

let wrapper = null

const propsData = {
    caption: "Test de tableau",
    colTitles: ['Colonne 1', 'Colonne 2'],
    tableContent: [['Ligne 1 colonne 1', 'Ligne 1 colonne 2'], ['Ligne 2 colonne 1', 'Ligne 2 colonne 2']],
    bordered: true,
    noScroll: true,
    fixedLayout: true,
    noCaption: true,
    bottomCaption: true
}

beforeEach(() => (wrapper = shallowMount(BaseTable, { propsData })))
afterEach(() => wrapper.destroy())


describe('BaseTable.vue', () => {
    describe('Table contents', () => {

        it("displays the search bar's label", () => {
            expect(wrapper.find('.rf-table Caption').text()).toBe(propsData.caption)
        })
        it("displays the columns titles", () => {
            expect(wrapper.findAll('th').at(0).text()).toBe(propsData.colTitles[0])
            expect(wrapper.findAll('th').at(1).text()).toBe(propsData.colTitles[1])
        })
        it("displays the rows content", () => {
            expect(wrapper.findAll('td').at(0).text()).toBe(propsData.tableContent[0][0])
            expect(wrapper.findAll('td').at(1).text()).toBe(propsData.tableContent[0][1])
            expect(wrapper.findAll('td').at(2).text()).toBe(propsData.tableContent[1][0])
            expect(wrapper.findAll('td').at(3).text()).toBe(propsData.tableContent[1][1])
        })
    })

    describe('Table parameters', () => {

        it("has the bordered class", () => {
            expect(wrapper.find('.rf-table').classes()).toContain('rf-table--bordered')
        })
        it("has the noScroll class", () => {
            expect(wrapper.find('.rf-table').classes()).toContain('rf-table--no-scroll')
        })
        it("has the fixedLayout class", () => {
            expect(wrapper.find('.rf-table').classes()).toContain('rf-table--layout-fixed')
        })
        it("has the noCaption class", () => {
            expect(wrapper.find('.rf-table').classes()).toContain('rf-table--no-caption')
        })
        it("has the bottomCaption class", () => {
            expect(wrapper.find('.rf-table').classes()).toContain('rf-table--caption-bottom')
        })
    })
})