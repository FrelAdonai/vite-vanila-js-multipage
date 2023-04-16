import { inputPhoneMask } from './input-phone'

export const validations = (arg) => {
    inputPhoneMask()

    // helpers
    function _fieldsTypeText(arr) {
        return Array.from(arr).filter((a) => a.getAttribute('data-required') === 'true')
    }

    function _fieldsTypeTextEmpty(arr) {
        return Array.from(arr)
            .filter((a) => a.getAttribute('data-required') === 'true')
            .filter((a) => a.type != 'checkbox' && a.type != 'radio')
            .filter((x) => x.value == '' || x.value.length <= 0)
    }

    function _fieldsTypeRadioCheckboxEmpty(arr) {
        return Array.from(arr)
            .filter((a) => a.getAttribute('data-required') === 'true')
            .filter((a) => a.type == 'checkbox' && a.type != 'radio')
            .filter((a) => a.checked == false)
    }

    // tooltip
    function _crateTooltip(arr, lang) {
        let fields = _fieldsTypeText(arr)

        fields.forEach((field) => {
            let tooltip = document.createElement('div')
            tooltip.classList.add('text-empty')

            switch (lang) {
                case 'en':
                    tooltip.textContent = arg.inputAnsverEn
                    break
                case 'uz':
                    tooltip.textContent = arg.inputAnsverUz
                    break
                case 'ru':
                    tooltip.textContent = arg.inputAnsverRu
                    break
                default:
                    tooltip.textContent = arg.inputAnsverRu
                    break
            }

            field.parentElement.insertAdjacentElement('beforeend', tooltip)
        })
    }

    function _tooltipShow(arr) {
        let fields = _fieldsTypeTextEmpty(arr)

        fields.forEach((field) => {
            let tooltip = field.parentElement.querySelector('.text-empty')
            tooltip.classList.add('show')
        })
    }

    function _tooltipShowSingle(field) {
        let tooltip = field.parentElement.querySelector('.text-empty')

        if (tooltip) {
            if (field.value == '' || field.value.length <= 0) {
                tooltip.classList.add('show')
            } else {
                tooltip.classList.remove('show')
            }
        }
    }

    // inputs
    function _addErrorField(field) {
        switch (field.type) {
            case 'checkbox':
                if (field.checked != true) {
                    field.parentElement.classList.add('input-error')
                }
                break

            default:
                if (field.value == '' || field.value.length <= 0) {
                    field.parentElement.classList.add('input-error')
                }

                break
        }
    }

    function _removeError(field) {
        switch (field.type) {
            case 'checkbox':
                if (field.checked == true) {
                    field.parentElement.classList.remove('input-error')
                }
                break

            default:
                if (field.value != '' || field.value.length > 0) {
                    field.parentElement.classList.remove('input-error')
                }

                break
        }
    }

    function _addErrorFields(arr) {
        arr.forEach((field) => {
            field.parentElement.classList.add('input-error')
        })
    }

    const formNode = document.querySelectorAll('.form-validation_js')

    formNode.forEach((form) => {
        let lang = form.getAttribute('data-lang')
        let fields = form.querySelectorAll('input')
        let btn = form.querySelector('[type="submit"]')
        btn.setAttribute('dat-valid-succes', 'false')

        _crateTooltip(fields, lang)

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            _addErrorFields(_fieldsTypeTextEmpty(fields))
            _addErrorFields(_fieldsTypeRadioCheckboxEmpty(fields))
            _tooltipShow(fields)
        })

        fields.forEach((field) => {
            field.addEventListener('blur', (e) => {
                _addErrorField(field)
                _removeError(field)
                _tooltipShowSingle(field)

                let allFields = [..._fieldsTypeTextEmpty(fields), ..._fieldsTypeRadioCheckboxEmpty(fields)]

                if (allFields.length <= 0) {
                    btn.setAttribute('dat-valid-succes', 'true')
                } else {
                    btn.setAttribute('dat-valid-succes', 'false')
                }
            })

            field.addEventListener('input', (e) => {
                _addErrorField(field)
                _removeError(field)
                _tooltipShowSingle(field)

                let allFields = [..._fieldsTypeTextEmpty(fields), ..._fieldsTypeRadioCheckboxEmpty(fields)]

                if (allFields.length <= 0) {
                    btn.setAttribute('dat-valid-succes', 'true')
                } else {
                    btn.setAttribute('dat-valid-succes', 'false')
                }
            })
        })
    })
}
