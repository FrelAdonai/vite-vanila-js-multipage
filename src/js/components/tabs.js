export const tabs = () => {
    function _hideItems(arr) {
        arr.forEach((element) => element.classList.remove('active'))
    }

    const tabs = document.querySelectorAll('.tab_js')

    tabs.forEach((tab) => {
        const tabBtns = tab.querySelectorAll('.tab-btn_js')
        const tabDrops = tab.querySelectorAll('.tab-drop_js')

        tabBtns.forEach((btn, index) => {
            const drop = tabDrops[index]

            btn.addEventListener('click', (e) => {
                _hideItems(tabBtns)
                _hideItems(tabDrops)

                btn.classList.add('active')
                drop.classList.add('active')
            })
        })
    })
}
