const CODES = {
    A: 65,
    Z: 90
}

function toCell(_, col){
    return `<div class="cell" contenteditable data-col="${col}"></div>`
}

function createRow(content, iterator){
    return `<div class="row" data-type="resizable">
                <div class="row-info">${iterator? iterator + 
                '<div class="row-resize" data-resize="row"></div>' : ''}
                    
                </div>
        
                <div class="row-data">${content}</div>
            </div>`
}

function toColumn(col, index){
    return `<div class="column" data-type="resizable" data-col="${index}">${col}
    <div class="col-resize" data-resize="col"></div>
    </div>`
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

    rows.push(createRow(cols))

    for (let i =0; i< rowsCount; i++){
        rows.push(createRow(colsEmpty, i + 1))
    }

    return rows.join('')
}