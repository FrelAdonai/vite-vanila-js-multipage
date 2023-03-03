function animFade(item, durEnd) {
    Object.assign(item.style, {
        display: 'flex',
        transition: '0s all ease',
        opacity: '0',
    })
    setTimeout(() => {
        Object.assign(item.style, {
            transition: `${durEnd}s all ease`,
            opacity: '1',
        })
    }, 0)
}

export const cratePreloader = (formSelector) => {
    let conteiner = document.createElement('div'),
        box = document.createElement('div')

    conteiner.classList.add('form-preloader')
    box.classList.add('form-preloader__round')

    conteiner.insertAdjacentElement('beforeend', box)
    document.querySelector(formSelector).insertAdjacentElement('beforeend', conteiner)

    animFade(conteiner, 0.5)
}

export const ansverPreloader = (formSelector, txt, duration) => {
    _removeItemPreloader('.form-preloader__round')
    setTimeout(() => {
        let form = document.querySelector(formSelector),
            box = document.createElement('div')

        box.classList.add('form-preloader__text')
        box.textContent = txt
        form.querySelector('.form-preloader').insertAdjacentElement('beforeend', box)

        _removePreloader(formSelector, '.form-preloader', duration)
    }, 300)
}

function _removeItemPreloader(selector) {
    let box = document.querySelector(selector)
    box.remove()
}

function _removePreloader(formSelector, selector, duration) {
    let form = document.querySelector(formSelector),
        box = form.querySelector(selector)

    setTimeout(() => {
        let inputArr = form.querySelectorAll('input'),
            btn = form.querySelector('button'),
            textAreaArr = form.querySelectorAll('textarea'),
            fileImgContainer = form.querySelector('.file__img-container')

        textAreaArr.forEach((element) => {
            element.value = ''
        })
        inputArr.forEach((element) => {
            element.value = ''
            element.checked = false
        })

        btn.classList.remove('valid-success')
        box.remove()

        if (fileImgContainer) {
            fileImgContainer.remove()
        }
    }, duration)
}
