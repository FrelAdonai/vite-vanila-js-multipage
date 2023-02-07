export const inputFile = () => {
    document.addEventListener('input', (e) => {
        let target = e.target.closest('.file')

        if (target) {
            let fileInput = target.querySelector('input'),
                arrFiles = Array.from(fileInput.files),
                containerAnsver = target.querySelectorAll('.file__img-container')

            if (containerAnsver[0]) {
                containerAnsver.forEach((element) => {
                    element.remove()
                })
            }

            target.insertAdjacentHTML('beforeend', _tmpContainer())
            let imgContainer = target.querySelector('.file__img-container')

            arrFiles.forEach((file) => {
                let reader = new FileReader()

                if (!file.type.match(fileInput.getAttribute('data-type'))) {
                    imgContainer.insertAdjacentHTML('beforeend', `<div class="file__error">${fileInput.getAttribute('data-error-type')}</div>`)

                    fileInput.value = ''
                    return
                }

                if (file.size > 10000000) {
                    imgContainer.insertAdjacentHTML('beforeend', `<div class="file__error">${fileInput.getAttribute('data-size')}</div>`)
                    fileInput.value = ''
                    return
                }

                reader.onload = (ev) => {
                    let fileType = file.type.match('image')

                    switch (fileType) {
                        case null:
                            imgContainer.insertAdjacentHTML(
                                'beforeend',
                                _tmpTextFile({
                                    url: ev.target.result,
                                    name: file.name,
                                    size: file.size,
                                })
                            )

                            break

                        default:
                            imgContainer.insertAdjacentHTML(
                                'beforeend',
                                _tmpImgFile({
                                    url: ev.target.result,
                                    name: file.name,
                                    size: file.size,
                                })
                            )

                            break
                    }

                    console.log(ev.target.result)
                }

                reader.readAsDataURL(file)
            })
        }
    })

    function _tmpContainer() {
        let tmp = `
          <div class="file__img-container"></div>
        `
        return tmp
    }

    function _tmpImgFile(params) {
        let tmp = `
        <div class="file__card" data-name="${params.name}">
           <div class="file__card-img">
                <img src="${params.url}">
           </div>
           <div class="file__card-info">
                <div class="file__card-name">${params.name}</div>
                <div class="file__card-size">${(params.size / 1024 / 1000).toFixed(3)} mb</div>
           </div>
        </div>
        `
        return tmp
    }

    function _tmpTextFile(params) {
        let tmp = `<div class="file__card" data-name="${params.name}">
           <div class="file__card-text">${params.name}</div>
           <div class="file__card-info">
                <div class="file__card-size">${(params.size / 1024 / 1000).toFixed(3)} mb</div>
           </div>
        </div>
        `

        return tmp
    }
}
