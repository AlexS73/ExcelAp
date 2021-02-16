export class TableSelection{
    static ClassName = 'selected'

    constructor($tableRoot) {
        this.$tableRoot =  $tableRoot
        this.group = []
        this.current = null
    }

    //$el instance of DOM
    select($el){
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.focus().addClass(TableSelection.ClassName)
    }


    clear(){
        this.group.forEach($el=> $el.removeClass(TableSelection.ClassName))
        this.group = []
    }

    selectGroup($el) {
        //получаем id крайних ячеек
        let firstEl = this.current.id(true)
        let secondEl = $el.id(true)

        let nodes = []

        //формируем диапазон
        const range = {
            minRow: Math.min(firstEl.row, secondEl.row ),
            maxRow: Math.max(firstEl.row, secondEl.row ),
            minCol : Math.min(firstEl.col, secondEl.col ),
            maxCol: Math.max(firstEl.col, secondEl.col ),
        }

        //проходим циклом по диапазону
        for(let row = range.minRow; row <= range.maxRow; row++){
            for(let cell = range.minCol; cell <= range.maxCol; cell++){
                let findСel = this.$tableRoot.find(`[data-id="${row}:${cell}"]`)
                nodes.push(findСel)
            }
        }
        this.clear()

        //отображаем выбранные ячейки
        nodes.forEach(node=>{
            this.group.push(node)
            node.addClass(TableSelection.ClassName)
        })
    }
}