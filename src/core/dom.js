class Dom{
    constructor(selector) {
        //#app
        this.$elDom =  typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    //получение или занесение html
    html(html) {
        if(typeof html === 'string'){
            this.$elDom.innerHTML = html
        }
        return this.$elDom.outerHTML.trim()
    }


    append(node){
        if(node instanceof Dom){
            node = node.$elDom
        }

        if (Element.prototype.append){
            this.$elDom.append(node)
        }
        else
        {
            this.$elDom.appendChild(node)
        }
        return this
    }

    //привязка слушателей
    on(eventType, callBack){
        this.$elDom.addEventListener(eventType,callBack)
    }

    off(eventType,callBack){
        this.$elDom.removeEventListener(eventType,callBack)
    }

    //метод получения родителя по селектору
    closest(selector){
        return $(this.$elDom.closest(selector))
    }

    getCoords(){
        return this.$elDom.getBoundingClientRect()
    }
}

export function $(selector){
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    //const el = document.createElement(tagName)
    const elNative = document.createElement(tagName)

    if(classes){
        elNative.classList.add(classes)
    }
    return $(elNative)
}

