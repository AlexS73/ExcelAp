const CODES = {
    A: 65,
    Z: 90
}

function toCell(){
    return `<div class="cell" contenteditable></div>`
}

function createRow(content, iterator){
    return `<div class="row">
                <div class="row-info">${iterator? iterator : ''}</div>
        
                <div class="row-data">${content}</div>
            </div>`
}

function toColumn(col){
    return `<div class="column">${col}</div>`
}

function toChar(_, index){
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15){
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    const colsEmpty = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')

    //console.log(cols);
    rows.push(createRow(cols))

    for (let i =0; i< rowsCount; i++){
        rows.push(createRow(colsEmpty, i + 1))
    }

    return rows.join('')
}