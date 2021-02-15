import {$} from "@core/dom";

export function resizeHandler($root, event){

    const $resizer = $(event.target)
    $resizer.css({
        opacity: 1,
    })

    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    let value

    document.onmousemove = (e) => {
        if (event.target.dataset.resize === 'col'){
            const delta = Math.floor(e.pageX - coords.right)
            value = coords.width + delta
            $resizer.css({
                right: -delta + 'px',
                bottom: '-2000px'
            })
        }
        else if(event.target.dataset.resize === 'row'){
            const delta = Math.floor(e.pageY - coords.bottom)
            value = coords.height + delta
            $resizer.css({
                bottom: -delta + 'px',
                right: '-2000px'
            })
        }
    }

    document.onmouseup= () =>{
        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        })

        if(event.target.dataset.resize ==='col'){
            $parent.css({
                width : value+'px'
            })

            //поиск всех колонок по data-col
            $root.findAll(`[data-col="${$parent.data.col}"]`)
                .forEach(el=> el.style.width = value+'px')
        }
        else if (event.target.dataset.resize ==='row'){
            $parent.css({
                height : value+'px'
            })
        }

        document.onmousemove = null
        document.onmouseup = null
    }

}