import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";

export class Table extends ExcelComponent{
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'mouseup', ]
        });
    }

    toHTML() {
        return createTable(30)
    }

    onMousedown(event){

        if(event.target.dataset.resize){
            console.log(event)
            this.$root.on('mousemove', this['onMousemove'])
        }
    }

    onMouseup(event){
        console.log(event)

        this.$root.off('mousemove', this['onMousemove'])
    }

    onMousemove(){
        console.log('move')
    }

}