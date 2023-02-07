export const validations = (arg) => {
    // helpers
    function _fieldsTypeText(arr) {
        return Array.from(arr).filter((a) => a.type === 'text')
    }

    function _fieldsTypeTextEmpty(arr) {
        return Array.from(arr)
            .filter((a) => a.type === 'text')
            .filter((x) => x.value === '' || x.value.length <= 0)
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

    function _tooltipShowOnese(field) {
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
    function _addErrorFieldOnese(field) {
        if (field.value == '' || field.value.length <= 0) {
            field.parentElement.classList.add('input-error')
        } else {
            field.parentElement.classList.remove('input-error')
        }
    }

    function _addErrorFields(arr) {
        let fields = _fieldsTypeTextEmpty(arr)

        fields.forEach((field) => {
            field.parentElement.classList.add('input-error')
        })
    }

    const formNode = document.querySelectorAll('form')

    formNode.forEach((form) => {
        let lang = form.getAttribute('data-lang')
        let fields = form.querySelectorAll('input')

        _crateTooltip(fields, lang)

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            _addErrorFields(fields)
            _tooltipShow(fields)
        })

        fields.forEach((field) => {
            field.addEventListener('input', (e) => {
                _addErrorFieldOnese(field)
                _tooltipShowOnese(field)
            })
        })
    })
}
