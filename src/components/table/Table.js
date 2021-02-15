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
            listeners: ['mousedown', ]
        });
    }

    prepare() {
        this.selection = new TableSelection()
    }

    toHTML() {
        return createTable(25)
    }

    init() {
        super.init();
        const cell = this.$root.find('[data-id="0:0"]')
        this.selection.select(cell)
    }

    onMousedown(event){
        if(shouldResize(event)){
            resizeHandler(this.$root, event)
        }else if(isCell(event)){
            if(event.shiftKey && this.selection.group.length > 0){
                let firstNode = this.selection.group[0]
                let secondNode = $(event.target)
                let nodes = []

                const range = {
                    minRow: Number(firstNode.data.row) > Number(secondNode.data.row) ? Number(secondNode.data.row) : Number(firstNode.data.row),
                    minCol : Number(firstNode.data.col) > Number(secondNode.data.col) ? Number(secondNode.data.col) : Number(firstNode.data.col),
                    maxRow: Number(firstNode.data.row) < Number(secondNode.data.row) ? Number(secondNode.data.row) : Number(firstNode.data.row),
                    maxCol: Number(firstNode.data.col) < Number(secondNode.data.col) ? Number(secondNode.data.col) : Number(firstNode.data.col),
                }

                for(let row = range.minRow; row <= range.maxRow; row++){
                    for(let cell = range.minCol; cell <= range.maxCol; cell++){
                        let findcell = this.$root.find(`[data-id="${row}:${cell}"]`)
                        nodes.push(findcell)
                    }
                }

                this.selection.selectGroup(nodes)
            }else{
                this.selection.select($(event.target))
            }


        }

    }

}