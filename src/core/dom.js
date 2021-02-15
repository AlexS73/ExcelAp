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

    //добавление в конец элемента другого элемента
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
        //вызываем нативный метод closest у нативного элемента
        return $(this.$elDom.closest(selector))
    }

    getCoords(){
        //Нативный метод получения координат
        return this.$elDom.getBoundingClientRect()
    }

    get data(){
        return this.$elDom.dataset
    }

    findAll(selector){
        return this.$elDom.querySelectorAll(selector)
    }

    find(selector){
        return $(this.$elDom.querySelector(selector))
    }

    css(styles= {}){
        // for(const key in styles){
        //     if(styles.hasOwnProperty(key)){
        //         this.$elDom.style[key] = styles[key]
        //     }
        // }

        Object.keys(styles).forEach( key => {
            this.$elDom.style[key] = styles[key]
        })
    }

    addClass(className){
        this.$elDom.classList.add(className)
    }

    removeClass(className){
        this.$elDom.classList.remove(className)
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

