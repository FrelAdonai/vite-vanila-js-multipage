;(function fullHeight() {
    function setHeight() {
        var vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setHeight()
})()
;(function tableAdaptive() {
    let tables = document.getElementsByTagName('table'),
        length = tables.length,
        i,
        wrapper

    for (i = 0; i < length; i++) {
        wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'table-wrapper')
        tables[i].parentNode.insertBefore(wrapper, tables[i])
        wrapper.appendChild(tables[i])
    }
})()
