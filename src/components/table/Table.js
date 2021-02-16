import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {isCell, shouldResize} from "@/components/table/table.functions";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@core/dom";

export class Table extends ExcelComponent{
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown']
        });
    }

    prepare() {
        this.selection = new TableSelection(this.$root)
    }

    toHTML() {
        return createTable(250)
    }

    init() {
        super.init();
        const cell = this.$root.find('[data-id="0:0"]')
        this.selection.select(cell)
    }

    onMousedown(event){
        if(shouldResize(event)){
            resizeHandler(this.$root, event)
        }
        else if(isCell(event)){
            if(event.shiftKey){
                this.selection.selectGroup($(event.target))
            }
            else{
                this.selection.select($(event.target))
            }
        }

    }

    onKeydown(event){
        const charKeys = [
            'Enter',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp'
        ]

        const {key} = event
        if(charKeys.includes(key) && !event.shiftKey){
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selection.select($next)
        }

    }
}

function nextSelector(key, {col, row}){
    const MIN_VALUE = 0
    switch (key){
        case 'Enter':
        case  'ArrowDown':
            row++
            break
        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
            break
        case 'ArrowRight':
            col++
            break
        case 'ArrowUp':
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
            break
    }

    return `[data-id="${row}:${col}"]`
}