var c = document.querySelector("canvas")
var ctx = c.getContext("2d")
var timer = requestAnimationFrame(main)
var gravity = 1
var asteroids = new Array()
var numAsteroids = 10
var gameOver = true
var score = 0
var gameStates = []
var currentState = 0
var ship;
var highScore = 0
var bgMain = new Image()
var eggMan = new Image()
var superSonic = new Image()
var startScreen = new Image()
var sameEnd = new Image()
var hiEnd = new Image()

bgMain.src = "images/level.jpg";
eggMan.src = "images/eggman.png"
superSonic.src = "images/sonicsprite.png"
startScreen.src = "images/StartScreen.png"
sameEnd.src = "images/sameScore.png"
hiEnd.src = "images/hiScore.png"

//Event listener to trigger main function when image is loaded.
bgMain.onload = function () {
    main()
}

eggMan.onload = function () {
    main()
}

superSonic.onload = function () {
    main()
}

startScreen.onload = function () {
    main()
}

sameEnd.onload = function () {
    main()
}

hiEnd.onload = function () {
    main()
}

function randomRange(high, low) {
    return Math.random() * (high - low) + low
}

//Asteroids GameObject Class
function Asteroids() {
    this.radius = randomRange(30, 10)
    this.x = randomRange(0 + this.radius, c.width - this.radius) + c.width
    this.y = randomRange(0 + this.radius, c.height - this.radius)
    this.vx = randomRange(-5, -1)
    this.vy = randomRange(5, 10)
    this.color = "white"

    this.draw = function () {
        ctx.save()
        //Draws original circles for asteroids.
        /*ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();*/
        ctx.drawImage(eggMan, this.x - this.radius / 0.7, this.y - this.radius / 0.7, this.radius * 3, this.radius * 3)
        ctx.restore()

    }
}



//Class for player ship
function PlayerShip() {
    this.x = c.width / 2
    this.y = c.height / 2
    this.w = 20
    this.h = 20
    this.vx = 0
    this.vy = 0
    this.up = false
    this.left = false
    this.right = false
    this.flamelength = 30

    this.draw = function () {
        ctx.save()
        ctx.translate(this.x, this.y)

        // Draws afterburner flame
        if (this.up == true || this.left == true || this.right == true) {
            ctx.save()
            //Animates the flame.
            if (this.flamelength == 30) {
                this.flamelength = 10
            }
            else {
                this.flamelength = 30
            }
            ctx.beginPath()
            ctx.fillStyle = "orange"
            ctx.moveTo(0, this.flamelength)
            ctx.lineTo(5, 5)
            ctx.lineTo(-5, 5)
            ctx.lineTo(0, this.flamelength)
            ctx.closePath()
            ctx.fill();
            ctx.restore()
        }
        ctx.beginPath();
        ctx.fillStyle = "red"
        ctx.moveTo(0, -10)
        ctx.lineTo(10, 10)
        ctx.lineTo(-10, 10)
        ctx.lineTo(0, -10)
        ctx.closePath()
        ctx.fill()
        ctx.drawImage(superSonic, -this.w / 2 - 10, -this.h / 2 - 10, this.h * 2, this.w * 2)
        ctx.restore();
    }

    this.move = function () {
        this.x += this.vx
        this.y += this.vy

        if (this.y > c.height - 10) {
            this.y = c.height - 10
            this.vy = 0
        }
        //Right boundary of screen.
        if (this.x > c.width - 10) {
            this.x = c.width - 10
            this.vx = 0
        }
        //Left boundary of screen.
        if (this.x < 0 + 10) {
            this.x = 0 + 10
            this.vx = 0
        }

        //Top boundary of screen.
        if (this.y < 0 + 10) {
            this.y = 0 + 10
            this.vy = 0
        }
    }

}

function gameStart() {
    //For loop to create all instances of asteroids.
    for (var i = 0; i < numAsteroids; i++) {
        asteroids[i] = new Asteroids()
    }
    //This creates an instance of the ship.
    ship = new PlayerShip()
}



//Adding event listeners
document.addEventListener("keydown", keyPressDown);
document.addEventListener("keyup", keyPressUp)

function keyPressUp(e) {
    //console.log("Key released " + e.keyCode);
    if (gameOver == false) {
        if (e.keyCode === 87) {
            ship.up = false
        }
        if (e.keyCode === 65) {
            ship.left = false
        }
        if (e.keyCode === 68) {
            ship.right = false
        }
        if (e.keyCode === 83) {
            ship.down = false
        }
    }
}

function keyPressDown(e) {
    //console.log("Key pressed " + e.keyCode);
    if (gameOver == false) {
        if (e.keyCode === 87) {
            ship.up = true
        }

        if (e.keyCode === 65) {
            ship.left = true
        }
        if (e.keyCode === 68) {
            ship.right = true
        }
        if (e.keyCode === 83) {
            ship.down = true
        }
    }
    if (gameOver == true) {
        if (e.keyCode === 13) {

            if (currentState == 2) {
                currentState = 0
                score = 0
                numAsteroids = 10;
                asteroids = []
                gameStart()
                main()
            }
            else {
                gameStart()
                gameOver = false
                currentState = 1
                main()
                scoreTimer()
            }

        }
    }
}

//GameStates State Machine

gameStates[0] = function () {
    ctx.save()
    ctx.drawImage(startScreen, 0, 0, c.width, c.height)
    /*ctx.font = "30px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText("Avoid the flying Eggmans!", c.width / 2, c.height / 2 - 30)
    ctx.font = "15px Arial"
    ctx.fillText("Press Enter to Start", c.width / 2, c.height / 2 + 20)*/
    ctx.restore()
}

gameStates[1] = function () {
    //Draws score to the HUD.
    ctx.drawImage(bgMain, 0, 0, c.width, c.height)
    ctx.save()
    ctx.font = "15px Russo One"
    ctx.fillStyle = 'white'
    ctx.fillText("Score: " + score.toString(), c.width - 150, 30)
    ctx.restore()


    //ship.vy += gravity

    //Key presses move the ship.
    if (ship.up == true) {
        ship.vy = -2.5
    }
    else if (ship.down == true) {
        ship.vy = 2.5
    }
    else {
        ship.vy = 0
    }

    if (ship.left == true) {
        ship.vx = -2.5
    }
    else if (ship.right == true) {
        ship.vx = 2.5
    }
    else {
        ship.vx = -1
    }
    //Loops through asteroid instances in array and draws them to the screen.
    for (var i = 0; i < asteroids.length; i++) {
        var dX = ship.x - asteroids[i].x
        var dY = ship.y - asteroids[i].y
        var dist = Math.sqrt((dX * dX) + (dY * dY))

        //Checks for collision between asteroid and ship.
        if (detectCollision(dist, (ship.h / 2 + asteroids[i].radius))) {
            //console.log("Colliding with asteroid " + i);

            currentState = 2
            gameOver = true
            //document.removeEventListener("keydown", keyPressDown);
            //document.removeEventListener("keyup", keyPressUp);
        }

        //Recycles asteroids
        if (asteroids[i].x < asteroids[i].radius) {
            asteroids[i].y = randomRange(c.height + asteroids[i].radius, asteroids[i].radius)
            asteroids[i].x = randomRange(c.width - asteroids[i].radius, asteroids[i].radius) + c.width
        }

        if (gameOver == false) {
            asteroids[i].x += asteroids[i].vx
        }

        asteroids[i].draw()
    }

    ship.draw();
    if (gameOver == false) {
        ship.move()
    }

    while (asteroids.length < numAsteroids) {
        asteroids.push(new Asteroids())
    }
}

gameStates[2] = function () {
    if (score > highScore) {
        highScore = score
        ctx.save()
        ctx.drawImage(hiEnd, 0, 0, c.width, c.height)
        ctx.font = "30px Russo One"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.fillText("Game Over, Your score was: " + score.toString(), c.width / 2, c.height / 2 - 80)
        ctx.fillText("Your New High Score is: " + highScore.toString(), c.width / 2, c.height / 2 - 30)
        ctx.fillText("New Record!!", c.width / 2, c.height / 2 + 30)
        ctx.font = "15px Russo One"
        ctx.fillText("Press Enter to Play Again!", c.width / 2, c.height / 2 + 75)
        ctx.restore()

    }
    else {
        ctx.save();
        ctx.drawImage(sameEnd, 0, 0, c.width, c.height)
        ctx.font = "30px Russo One"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.fillText("Game Over, Your score was: " + score.toString(), c.width / 2, c.height / 2 - 80)
        ctx.fillText("Your High Score is: " + highScore.toString(), c.width / 2, c.height / 2 - 30)
        ctx.font = "15px Russo One"
        ctx.fillText("Press Enter to Play Again!", c.width / 2, c.height / 2 + 30)
        ctx.restore()
    }


}

function main() {
    ctx.clearRect(0, 0, c.width, c.height)
    /*
    Old game code was here
    */

    if (gameOver == false) {
        timer = requestAnimationFrame(main)
    }
    gameStates[currentState]()
}

function detectCollision(distance, calcDistance) {
    return distance < calcDistance
}

function scoreTimer() {
    if (gameOver == false) {
        score++
        //Using modulus to divide the score by 5 and if the remainder is zero, add asteroids.
        if (score % 5 == 0) {
            numAsteroids += 5
            console.log(numAsteroids)
        }
        // console.log(score);
        setTimeout(scoreTimer, 1000)
    }
}