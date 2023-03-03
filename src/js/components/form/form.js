import { validateForm } from './forValid.js'
import { customSelect } from './selecCustom.js'
import { inputFile, phoneMask } from './fieldHendler.js'

export const form = () => {
    //
    phoneMask()
    inputFile()
    customSelect({
        select: '.select-custom_js',
        field: '.select-custom__field',
        list: '.select-custom__list',
    })

    validateForm('.valid_js')
}
