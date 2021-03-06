const canvas = document.getElementById('jsCanvas')
const colors = document.getElementsByClassName('jsColor')
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode')
const saveBtn = document.getElementById('jsSave')
const ctx = canvas.getContext('2d')
const CANVAS_SIZE = 600

let painting = false
let filling = false

canvas.width = CANVAS_SIZE
canvas.height = CANVAS_SIZE

ctx.fillStyle = 'white'
ctx.strokeStyle = '#2c2c2c'
ctx.lineWidth = 2.5

function stopPainting() {
  painting = false
}

function startPainting() {
  painting = true
}

function onMouseMove(event) {
  const x = event.offsetX
  const y = event.offsetY
  if (!painting) {
    ctx.beginPath()
    ctx.moveTo(x, y)
  } else {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

function onMouseUp(event) {
  stopPainting()
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor
  ctx.strokeStyle = color
  ctx.fillStyle = color
}

function handleRangeChange(event) {
  const size = event.target.value
  ctx.lineWidth = size
}

function handleModeClick() {
  if (filling === true) {
    filling = false
    mode.innerText = 'Fill'
  } else {
    filling = true
    mode.innerText = 'Paint'
  }
}

function handleCanvaClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  }
}

function handleCM(event) {
  event.preventDefault()
}

function handleSaveClick() {
  const image = canvas.toDataURL()
  const link = document.createElement('a')
  link.href = image
  link.download = 'paint'
  link.click()
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', startPainting)
  canvas.addEventListener('mouseup', onMouseUp)
  canvas.addEventListener('mouseleave', stopPainting)
  canvas.addEventListener('click', handleCanvaClick)
  canvas.addEventListener('contextmenu', handleCM)
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick))

if (range) {
  range.addEventListener('input', handleRangeChange)
}

if (mode) {
  mode.addEventListener('click', handleModeClick)
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick)
}