export const validateForm = (form) => {
    // внутрение функции
    function _arrInputEmpty(arr) {
        return [...arr]
            .filter((x) => x.getAttribute('data-empty'))
            .filter((x) => x.type != 'checkbox')
            .filter((x) => x.type != 'file')
            .filter((x) => x.value.replace(/ /g, '').length < 1)
    }

    function _arrMailEmpty(arr) {
        return [...arr].filter((x) => x.getAttribute('data-mail')).filter((x) => !x.value.includes('@'))
    }

    function _arrCheckboxEmpty(arr) {
        return [...arr]
            .filter((x) => x.type === 'checkbox')
            .filter((x) => !x.classList.contains('consent_check-js'))
            .filter((x) => !x.checked)
    }

    function _arrFileEmpty(arr) {
        return [...arr].filter((x) => x.type === 'file').filter((x) => x.value === '')
    }

    function _creatAtention(itemParent, field, text) {
        let atentionHas = itemParent.querySelector('.text-empty')

        if (!atentionHas) {
            _removeAtention(itemParent)

            let atention = document.createElement('div')
            atention.textContent = field.getAttribute(text)
            atention.classList.add('text-empty')

            itemParent.insertAdjacentElement('beforeend', atention)
        }
    }

    function _removeAtention(itemParent) {
        let atentionHas = itemParent.querySelector('.text-empty')

        if (atentionHas) {
            atentionHas.remove()
        }
    }

    // Начало
    let formNode = document.querySelectorAll(form)

    for (let index = 0; index < formNode.length; index++) {
        const form = formNode[index]

        let inputNode = form.querySelectorAll('input'),
            textareaNode = form.querySelectorAll('textarea'),
            btnSubmite = form.querySelector('button'),
            consentCheckbox = form.querySelector('.consent_check-js'),
            inputEmptyArr = _arrInputEmpty([...textareaNode, ...inputNode]),
            mailEmptyArr = _arrMailEmpty(inputNode),
            chekboxEmptyInputArr = _arrCheckboxEmpty(inputNode),
            fileInputArr = _arrFileEmpty(inputNode)

        form.onsubmit = function () {
            if (!btnSubmite.classList.contains('valid-success')) {
                return false
            }
        }

        form.oninput = function () {
            inputEmptyArr = _arrInputEmpty([...textareaNode, ...inputNode])
            mailEmptyArr = _arrMailEmpty(inputNode)
            chekboxEmptyInputArr = _arrCheckboxEmpty(inputNode)
            fileInputArr = _arrFileEmpty(inputNode)

            let inputArrBoolean = [!inputEmptyArr.length]

            if (consentCheckbox) {
                inputArrBoolean.push(consentCheckbox.checked)
            }
            inputArrBoolean.push(!mailEmptyArr.length)
            inputArrBoolean.push(!chekboxEmptyInputArr.length)
            inputArrBoolean.push(!fileInputArr.length)

            btnSubmite.classList[inputArrBoolean.some((x) => !x) ? 'remove' : 'add']('valid-success')
        }

        // инпуты пустые
        inputEmptyArr.forEach((el) => {
            el.onfocus = function () {
                el.parentElement.classList.remove('input-error')
                _removeAtention(el.parentElement)
            }

            el.onblur = function () {
                if (el.value.replace(/ /g, '').length < 1) {
                    el.parentElement.classList.add('input-error')
                    _creatAtention(el.parentElement, el, 'data-empty')
                }
            }
        })

        // инпуты почты
        mailEmptyArr.forEach((el) => {
            el.onblur = function () {
                if (el.getAttribute('data-mail') && !el.value.includes('@') && el.value != '') {
                    el.parentElement.classList.add('input-error')
                    _creatAtention(el.parentElement, el, 'data-mail')
                }

                if (el.value.replace(/ /g, '').length < 1) {
                    el.parentElement.classList.add('input-error')
                    _creatAtention(el.parentElement, el, 'data-empty')
                }
            }
        })

        // чекбоксы
        chekboxEmptyInputArr.forEach((el) => {
            el.oninput = function () {
                el.parentElement.classList.toggle('input-error', !el.checked)
            }
        })

        // инпут файл
        fileInputArr.forEach((el) => {
            el.onchange = function () {
                el.parentElement.classList.toggle('input-error', el.value === '')
            }
        })

        // согласие на обрабоку
        if (consentCheckbox) {
            consentCheckbox.oninput = function () {
                consentCheckbox.parentElement.classList.toggle('input-error', !consentCheckbox.checked)
            }
        }

        // кнопка сабмит
        if (btnSubmite.type === 'submit') {
            btnSubmite.onclick = function (e) {
                e.preventDefault()

                if (consentCheckbox && !consentCheckbox.checked) {
                    consentCheckbox.parentElement.classList.add('input-error')
                }

                inputEmptyArr = _arrInputEmpty([...textareaNode, ...inputNode])
                mailEmptyArr = _arrMailEmpty(inputNode)
                chekboxEmptyInputArr = _arrCheckboxEmpty(inputNode)
                fileInputArr = _arrFileEmpty(inputNode)

                inputEmptyArr.forEach((el) => {
                    el.parentElement.classList.add('input-error')
                    _creatAtention(el.parentElement, el, 'data-empty')
                })

                chekboxEmptyInputArr.forEach((el) => {
                    el.parentElement.classList.add('input-error')
                })

                fileInputArr.forEach((el) => {
                    el.parentElement.classList.add('input-error')
                })
            }
        }
    }
}
