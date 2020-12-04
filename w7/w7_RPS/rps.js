window.onload = function () {
    var c = document.querySelector('canvas')
    var ctx = c.getContext('2d')

    var sword = new Image()
    var lance = new Image()
    var axe = new Image()
    var hsword = new Image()
    var hlance = new Image()
    var haxe = new Image()
    var empty = new Image()
    var score = 0

    sword.src = 'images/EliwoodSword.png'
    lance.src = 'images/FlorinaLance.png'
    axe.src = 'images/HectorAxe.png'

    hsword.src = 'images/EliwoodSwordPC.png'
    hlance.src = 'images/FlorinaLancePC.png'
    haxe.src = 'images/HectorAxePC.png'

    empty.src = 'images/empty.png'

    haxe.onload = function () {
        draw(empty, empty, empty, empty, empty, empty)
    }

    var results = 'Choose an option above to face off against the computer!'

    var rps = []
    rps[0] = 'Sword'
    rps[1] = 'Lance'
    rps[2] = 'Axe'

    //Array of Buttons
    var btn = document.querySelectorAll('a')
    //assign event listeners to the buttons
    btn[0].addEventListener('click', function (e) { play(0) })
    btn[1].addEventListener('click', function (e) { play(1) })
    btn[2].addEventListener('click', function (e) { play(2) })





    function play(playersChoice) {
        var cpuChoice = Math.floor(Math.random() * 2.999)
        //alert("Player Choice: " + rps[playersChoice] + " vs. Computer Choice: " + rps[cpuChoice])

        switch (playersChoice) {
            case 0:
                if (cpuChoice === 0) {
                    //alert("It's a tie!")
                    results = "It's a tie!"
                    draw(empty, empty, empty, sword, empty, hsword)
                }
                else if (cpuChoice === 1) {
                    //alert("You Lost!")
                    results = "You lost!"
                    draw(empty, empty, empty, sword, empty, hlance)
                }
                else {
                    //alert("You Win!")
                    results = "You Win!"
                    draw(empty, empty, empty, sword, empty, haxe)
                }
                break
            case 1:
                if (cpuChoice === 0) {
                    //alert("You Win!")
                    results = "You Win!"
                    draw(empty, empty, empty, lance, empty, hsword)
                }
                else if (cpuChoice === 1) {
                    //alert("It's a tie!")
                    results = "It's a tie!"
                    draw(empty, empty, empty, lance, empty, hlance)
                }
                else {
                    //alert("You Lose!")
                    results = "You Lose!"
                    draw(empty, empty, empty, lance, empty, haxe)
                }
                break
            case 2:
                if (cpuChoice === 0) {
                    //alert("You Lose!")
                    results = "You Lose!"
                    draw(empty, empty, empty, axe, empty, hsword)
                }
                else if (cpuChoice === 1) {
                    //alert("You Win!")
                    results = "You Win!"
                    draw(empty, empty, empty, axe, empty, hlance)
                }
                else {
                    //alert("It's a tie!!")
                    results = "It's a tie!"
                    draw(empty, empty, empty, axe, empty, haxe)
                }
                break
        }
    }

    function draw(sword, lance, axe, csword, clance, caxe) {
        ctx.clearRect(0, 0, c.width, c.height)

        ctx.save()
        ctx.font = '30px Yeon Sung, cursive'
        ctx.textAlign = 'center'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = '5'
        ctx.fillStyle = 'white'
        ctx.strokeText('Player Choice', c.width / 2 - 225, 350)
        ctx.fillText('Player Choice', c.width / 2 - 225, 350)
        ctx.drawImage(sword, c.width / 2 - 225 - sword.width / 2, 150)
        ctx.drawImage(lance, c.width / 2 - lance.width / 2, 150)
        ctx.drawImage(axe, c.width / 2 + 225 - axe.width / 2, 150)
        ctx.restore()

        ctx.save()
        ctx.font = '30px Yeon Sung, cursive'
        ctx.textAlign = 'center'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = '5'
        ctx.fillStyle = 'white'
        ctx.strokeText('Computer Choice', c.width / 2 + 225, 350)
        ctx.fillText('Computer Choice', c.width / 2 + 225, 350)
        ctx.drawImage(csword, c.width / 2 - 225 - sword.width / 2, 375)
        ctx.drawImage(clance, c.width / 2 - lance.width / 2, 375)
        ctx.drawImage(caxe, c.width / 2 + 225 - axe.width / 2, 375)
        ctx.restore()

        //Displays results.
        ctx.save()
        ctx.font = '30px Yeon Sung, cursive'
        ctx.textAlign = 'center'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = '5'
        ctx.fillStyle = 'white'
        ctx.strokeText(results, c.width / 2, 150,)
        ctx.fillText(results, c.width / 2, 150,)
        ctx.restore()

        ctx.save()
        ctx.font = "25px Yeon Sung, cursive"
        ctx.fillStyle = "white"
        ctx.fillText("Wins: " + score.toString(), c.width - 150, 30)
        ctx.restore()

        if (results === "You Win!") {
            score++
        }
    }
}
