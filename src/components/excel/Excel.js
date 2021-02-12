import {$} from "@core/dom";

export class Excel{
    constructor(selector, options) {
        this.$elDomExcel = $(selector)
        this.components = options.components || []
    }

    //Создание разметки
    getRoot(){
        //создание корневой разметки 'div' для всех компонентов
        const $root = $.create('div', 'excel')

        //для каждого компонента формируем html
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className) // Создаем
            const component = new Component($el) //new Component ~  new ExcelComponent

            // //DEBUG
            // if(component.name){
            //     window['c' + component.name] = component
            // }

            $el.html(component.toHTML())
            $root.append($el)
            return component
        })

        return $root
    }


    render(){
        let root = this.getRoot()
        this.$elDomExcel.append(root)
        //console.log(this.components)
        this.components.forEach(component => component.init())
    }
}