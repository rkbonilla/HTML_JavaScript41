window.onload = function () {
    var c = document.querySelector('canvas')
    var ctx = c.getContext('2d')

    var sword = new Image()
    var timer = requestAnimationFrame(main)

    sword.src = 'images/swordlogo.png'

    function main() {
        timer = requestAnimationFrame(main)
        ctx.clearRect(0, 0, c.width, c.height)
        ctx.font = '30px Yeon Sung, cursive'
        ctx.textAlign = 'center'
        ctx.fillText("Welcome to my Fire Emblem inspired Rock, Paper, Scissors game!", c.width / 2, 150,)
        ctx.fillText("Hit the button above to start playing; enjoy!", c.width / 2, 200)
        ctx.drawImage(sword, c.width / 2 - 175, c.height / 2 - 75)
    }
}