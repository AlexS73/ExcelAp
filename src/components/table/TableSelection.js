export class TableSelection{
    static ClassName = 'selected'

    constructor() {
        this.group = []
    }

    //$el instance of DOM
    select($el){
        this.clear()
        this.group.push($el)
        $el.addClass(TableSelection.ClassName)
    }

    clear(){
        this.group.forEach($el=> $el.removeClass(TableSelection.ClassName))
        this.group = []
    }


    selectGroup(nodes) {
        this.clear()

        nodes.forEach(node=>{
            this.group.push(node)
            node.addClass(TableSelection.ClassName)
        })
    }
}