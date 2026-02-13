let pixels = document.querySelector('.pixels')
let colors = document.querySelector('.colors')
let eraser = document.querySelector('.eraser')
let fill = document.querySelector('.fill')
let instruments = document.querySelector('.instruments')
let currentColor = '' //
let isClicked = false
let isFill = false
let currentInstrument = eraser

const COLORSMAP = [
    '',
    'red',
    'yellow',
    'orange',
    'green',
    'blue',
    'pink',
    'purple',
    'black',
    'white'
]


anime({
    targets: currentInstrument,
    scale: [1, 0.9],
    duration: 500,
})

let tempResult = getResultFromCookie()

for (let i = 0; i < 800; i += 1) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.style.backgroundColor = COLORSMAP[parseInt(tempResult[i])]
    pixels.append(cell)
}

let cells = document.querySelectorAll('.cell')

instruments.addEventListener('click', function (e) {
    if (!e.target.classList.contains('instruments')) {
        const rootStyles = getComputedStyle(e.target);
        if (rootStyles.getPropertyValue('--clr') != '') {
            currentColor = rootStyles.getPropertyValue('--clr');
        }

        anime({
            targets: currentInstrument,
            scale: 1,
            duration: 50,
        }).finished.then(function () {
            currentInstrument = e.target
            anime({
                targets: currentInstrument,
                scale: [1, 0.9],
                duration: 50,
            })
        })
    }
})

document.addEventListener('mousedown', function () {
    isClicked = true
})
document.addEventListener('mouseup', function () {
    isClicked = false
})

pixels.addEventListener('mousemove', function (e) {
    if (e.target.classList.contains('cell') && isClicked && !isFill) {
        e.target.style.background = currentColor
    }
})
///////

pixels.addEventListener('click', function (e) {
    if (isFill) {
        for (let cell of cells) {
            cell.style.background = currentColor
            console.log(currentColor)
        }
    }
    else if (e.target.classList.contains('cell')) {
        e.target.style.background = currentColor
        console.log(currentColor)
    }
})
//eraser
eraser.addEventListener('click', function (e) {
    currentColor = ''
    console.log('erorr')
})
//fill
fill.addEventListener('click', function () {
    isFill = !isFill
})

//перезавись куки

setInterval(function(){
    let result = ''

    for(let cell of cells){
        let color = cell.style.backgroundColor
        let colorIndex = COLORSMAP.indexOf(color)
        result += colorIndex
    }
    document.cookie = `pixel-result=${result}; max-age=1000000`
}, 10000)

function getResultFromCookie(){
    let cookies = document.cookie.split('; ')
    for(let cookie of cookies){
        const [name, value] = cookie.split('=')
        if (name == 'pixel-result'){
            return value
        }
    }
    return '0' * 800
}

