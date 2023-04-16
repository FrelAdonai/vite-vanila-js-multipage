import { customSelect } from './select'
import { inputFile } from './input-file'
import { validations } from './validation'

inputFile()

customSelect({
    select: '.select-custom_js',
    field: '.select-custom__field',
    list: '.select-custom__list',
})

validations({
    inputAnsverRu: 'Поле обязательно для заполнения',
    inputAnsverEn: 'This field is required.',
    inputAnsverUz: "To'ldirish uchun majburiy",
})
