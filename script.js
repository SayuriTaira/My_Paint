const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const tools = document.querySelectorAll('.tool')
const inputColor = document.querySelector('.input-color')
const buttonSize = document.querySelectorAll('.button-size')
const buttonClear = document.querySelector('.button-clear')

let activeSize, isClicking, activeTool

const draw = (x, y) => {
    let color = inputColor.value

    ctx.globalCompositeOperation = 'destination-over'
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, activeSize / 2, 0, 2 * Math.PI)
    ctx.fill()
}

const erase = (x, y) => {
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, activeSize / 2, 0, 2 * Math.PI)
    ctx.fill()
}

tools.forEach((tool) => {
    tool.addEventListener('click', (event) => {
        let action = tool.getAttribute('data-action')
        activeTool = action

        tools.forEach((tool) => {
            tool.classList.remove('active')
        })

        event.target.closest('button').classList.add('active')
    })
})

buttonSize.forEach((element) => {
    element.addEventListener('click', (event) => {
        let size = element.getAttribute('data-size')
        activeSize = size

        buttonSize.forEach((element) => {
            element.classList.remove('active')
        })

        event.target.closest('button').classList.add('active')
    })
})

buttonClear.addEventListener('click', () => {
    ctx.clearRect(0, 0, 900, 600)
})

canvas.addEventListener('mousedown', (event) => {
    if(activeTool == 'brush') {
        draw(event.clientX, event.clientY)
        isClicking = true

    } if (activeTool == 'rubber') {
        erase(event.clientX, event.clientY)
        isClicking = true
    }
})

canvas.addEventListener('mousemove', (event) => {
    if(isClicking && activeTool == 'brush'){
        draw(event.clientX, event.clientY)
    }

    if(isClicking && activeTool == 'rubber'){
        erase(event.clientX, event.clientY)
    }
})

canvas.addEventListener('mouseup', () => {
    isClicking = false
})