import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@core/dom";

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

            const $resizer = $(event.target)

            //const $parent = $resizer.$elDom.parentNode //bad
            //const $parent = $resizer.$elDom.closest('.column')
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()

            document.onmousemove = (e) => {

                if (event.target.dataset.resize === 'col'){
                    const delta = Math.floor(e.pageX - coords.right)
                    const value = coords.width + delta
                    $parent.$elDom.style.width = value + 'px'
                }
                else if(event.target.dataset.resize === 'row'){
                    const delta = Math.floor(e.pageY - coords.bottom)
                    const value = coords.height + delta
                    $parent.$elDom.style.height = value + 'px'
                }

            }

            document.onmouseup= () =>{
                document.onmousemove = null
            }

        }
    }

    onMouseup(event){


    }

    onMousemove(){

    }

}