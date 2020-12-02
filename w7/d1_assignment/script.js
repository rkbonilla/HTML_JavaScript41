//JavaScript goes here.

var c = document.querySelector('canvas')
var ctx = c.getContext('2d')

//Timer
var timer = requestAnimationFrame(main)

function main() {
    timer = requestAnimationFrame(main)
    //clear the canvas
    ctx.clearRect(0, 0, 800, 600)
    drawBox()
    drawCircle()
    drawLine()
    drawPenta()
    drawStar()
}

function drawBox() {
    ctx.fillStyle = 'yellow'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 5
    ctx.fillRect(87.5, 303.5, 95, 96)
    ctx.strokeRect(87.5, 303.5, 95, 96)
    ctx.save()
}

function drawCircle() {
    ctx.fillStyle = '#ffff00'
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.arc(385, 441, 65, 0, 2 * Math.PI, false);
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.save()
}

function drawLine() {
    ctx.strokeStyle = `rgb(255,0,0)`
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(85, 682)
    ctx.lineTo(278, 549)
    ctx.closePath()
    ctx.stroke()
    ctx.save()
}

function drawPenta() {
    ctx.strokeStyle = '#00ffff'
    ctx.lineWidth = 5
    ctx.fillStyle = '#ff00ff'
    ctx.beginPath()
    ctx.moveTo(557, 308)
    ctx.lineTo(667, 284)
    ctx.lineTo(724, 380)
    ctx.lineTo(650, 464)
    ctx.lineTo(549, 420)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.save()
}

function drawStar() {
    ctx.strokeStyle = `rgb(32,32,32)`
    ctx.lineWidth = 5
    ctx.fillStyle = '#ffff00'
    ctx.beginPath()
    ctx.moveTo(635, 496)
    ctx.lineTo(667, 554)
    ctx.lineTo(732, 567)
    ctx.lineTo(688, 614)
    ctx.lineTo(695, 680)
    ctx.lineTo(636, 653)
    ctx.lineTo(576, 680)
    ctx.lineTo(584, 614)
    ctx.lineTo(538, 567)
    ctx.lineTo(603, 554)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.save()
}