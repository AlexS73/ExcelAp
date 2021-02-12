import {capitalize} from "@core/utils";

export class DomListener {
    constructor($root, listeners = []) {
        if(!$root){
            throw new Error(`No $root provided for DomListener!`)
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners(){
        this.listeners.forEach(listener => {
            //Получаем название метода
            const method = getMethodName(listener)

            //Если событие передано, но метод не реализован выбрасываем исключение
            if(!this[method]){
                throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`)
            }
            // .bind создает новую функцию, соотвественно новый контекст
            //Привязываем к существуещей функции контекст this
            this[method] = this[method].bind(this)

            //Тоже самое что и addEventListener
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners(){
        this.listeners.forEach(listener => {
            //Получаем название метода
            const method = getMethodName(listener)

            //Тоже самое что и removeEventListener
            this.$root.off(listener, this[method])
        })
    }
}

//input => onInput
function getMethodName(eventName){
    return 'on' + capitalize(eventName)
}