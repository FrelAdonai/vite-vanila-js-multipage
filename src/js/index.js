// plugin import
import './sliders/slider'
import './modals/modals'
// import './datepiker/air-datepiker'
// import './sliders/range-slider'

// WORK IMPORT
import './common/common'
import { customSelect } from './components/form/select'
import { tabs } from './components/tabs'
import { inputFile } from './components/form/input-file'
import { validations } from './components/form/validation'

customSelect({
    select: '.select-custom_js',
    field: '.select-custom__field',
    list: '.select-custom__list',
})
inputFile()
validations({
    inputAnsverRu: 'Обязательно для заполнения',
    inputAnsverEn: 'Required to fill',
    inputAnsverUz: "To'ldirish uchun majburiy",
})
tabs()
