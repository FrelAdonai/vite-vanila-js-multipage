import { customSelect } from './select'
import { inputFile } from './input-file'
import { inputPhoneMask } from './input-phone'
import { validations } from './validation'

inputFile()
inputPhoneMask()
customSelect({
    select: '.select-custom_js',
    field: '.select-custom__field',
    list: '.select-custom__list',
})
validations({
    inputAnsverRu: 'Обязательно для заполнения',
    inputAnsverEn: 'Required to fill',
    inputAnsverUz: "To'ldirish uchun majburiy",
})
