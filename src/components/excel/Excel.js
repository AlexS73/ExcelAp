import {$} from "@core/dom";

export class Excel{
    constructor(selector, options) {
        //this.$elNative = document.querySelector(selector)
        this.$elDomExcel = $(selector)
        this.components = options.components || []
    }

    getRoot(){
/*        const $root = document.createElement('div')
        $root.classList.add('excel')*/

        const $root = $.create('div', 'excel')


        this.components.forEach(Component => {
/*            const $el = document.createElement('div')
            $el.classList.add(Component.className)*/

            const $el = $.create('div', Component.className)
            const component = new Component($el)

            //$el.innerHTML = component.toHTML()
            $el.html(component.toHTML())

            //$root.insertAdjacentHTML('beforeend', component.toHTML())
            $root.append($el)
        })

        return $root
    }

    render(){
        let root = this.getRoot()
        //this.$elNative.append(root)
        this.$elDomExcel.append(root)
    }
}