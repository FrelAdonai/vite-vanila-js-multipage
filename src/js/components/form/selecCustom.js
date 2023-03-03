export const customSelect = (arg) => {
    function _tmpField(selectCustom) {
        let field = document.createElement('div')

        field.classList.add('select-custom__field')
        selectCustom.insertAdjacentElement('afterbegin', field)
    }

    function _tmpList(options, selectCustom, selectorField) {
        let listWrap = document.createElement('div')
        let list = document.createElement('ul')
        let field = selectCustom.querySelector(selectorField)

        listWrap.classList.add('select-custom__list')

        options.forEach((element) => {
            let item = document.createElement('li')
            item.classList.add('select-custom__list-item')
            item.textContent = element.textContent

            list.insertAdjacentElement('beforeend', item)
        })

        field.textContent = Array.from(options).filter((x) => x.selected)[0].textContent

        listWrap.insertAdjacentElement('beforeend', list)
        field.insertAdjacentElement('afterend', listWrap)

        Array.from(listWrap.querySelectorAll('.select-custom__list-item'))
            .filter((x) => x.textContent === field.textContent)[0]
            .classList.add('active')
    }

    function _delegationFieldShow(selectorSelect, selectorField, selectorList) {
        document.addEventListener('click', (e) => {
            let target = e.target.closest(selectorField)

            if (target) {
                switch (!target.closest(selectorSelect).classList.contains('active')) {
                    case true:
                        let list = target.closest(selectorSelect).querySelector(selectorList)
                        list.remove()
                        let options = target.closest(selectorSelect).querySelectorAll('option')
                        _tmpList(options, target.closest(selectorSelect), selectorField)

                        _selectNodeSelectorRemove(selectorSelect)

                        target.closest(selectorSelect).classList.toggle('active')
                        target.nextElementSibling.classList.toggle('active')

                        break

                    default:
                        target.closest(selectorSelect).classList.remove('active')
                        target.nextElementSibling.classList.remove('active')

                        break
                }
            }
        })
    }

    function _delegationFiledListHide(selectorSelect, selectorField, selectorList) {
        document.addEventListener('click', (e) => {
            let targetField = e.target.closest(selectorField)
            let targetList = e.target.closest(selectorList)

            if (!targetField && !targetList) {
                _selectNodeSelectorRemove(selectorSelect)
            }
        })
    }

    function _delegationItemHendler(selectorSelect, selectorField) {
        document.addEventListener('click', (e) => {
            let target = e.target.closest('.select-custom__list-item')

            if (target) {
                let field = target.closest(selectorSelect).querySelector(selectorField)
                let selectTrue = target.closest(selectorSelect).querySelector('select')
                let optionTrue = selectTrue.querySelectorAll('option')

                if (!target.classList.contains('active')) {
                    target
                        .closest(selectorSelect)
                        .querySelectorAll('.select-custom__list-item')
                        .forEach((element) => element.classList.remove('active'))
                    target.classList.add('active')

                    let selectedOption = Array.from(optionTrue).filter((x) => x.textContent === target.textContent)[0]
                    selectedOption.selected = true

                    console.log(selectedOption)
                    field.textContent = Array.from(optionTrue).filter((x) => x.selected)[0].textContent

                    _selectNodeSelectorRemove(selectorSelect)
                }
            }
        })
    }

    function _selectNodeSelectorRemove(selectorSelect) {
        const selectNode = document.querySelectorAll(selectorSelect)

        selectNode.forEach((element) => {
            element.closest(selectorSelect).classList.remove('active')
            element.children[1].classList.remove('active')
        })
    }

    //
    let selectorSelect = arg.select
    let selectorField = arg.field
    let selectorList = arg.list

    const selectNode = document.querySelectorAll(selectorSelect)

    for (let index = 0; index < selectNode.length; index++) {
        const select = selectNode[index]

        let options = select.querySelectorAll('option')
        _tmpField(select)
        _tmpList(options, select, selectorField)
    }

    _delegationFieldShow(selectorSelect, selectorField, selectorList)
    _delegationFiledListHide(selectorSelect, selectorField, selectorList)
    _delegationItemHendler(selectorSelect, selectorField)
}
