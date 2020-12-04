var c = document.querySelector("canvas")
var ctx = c.getContext("2d")
var timer = requestAnimationFrame(main)
var gravity = 1
var asteroids = new Array()
var numAsteroids = 10
var gameOver = false
var score = 0

function randomRange(high, low) {
    return Math.random() * (high - low) + low
}

//Asteroids GameObject Class
function Asteroids() {
    this.radius = randomRange(15, 2)
    this.x = randomRange(0 + this.radius, c.width - this.radius)
    this.y = randomRange(0 + this.radius, c.height - this.radius) - c.height
    this.vx = randomRange(-5, -10)
    this.vy = randomRange(10, 5)
    this.color = "white"

    this.draw = function () {
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
    }
}

//This will create all the instances of the asteroids.
for (var i = 0; i < numAsteroids; i++) {
    asteroids[i] = new Asteroids()
}

//Class for player ship.
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

        //Draws afterburner flame.
        if (this.up == true || this.left == true || this.right == true) {
            ctx.save()
            //Animate flame.
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
            ctx.fill()
            ctx.restore()
        }

        ctx.beginPath()
        ctx.fillStyle = "red"
        ctx.moveTo(0, -10)
        ctx.lineTo(10, 10)
        ctx.lineTo(-10, 10)
        ctx.lineTo(0, -10)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
    }

    this.move = function () {
        this.x += this.vx
        this.y += this.vy

        if (this.y < 0 + 10) {
            this.y = 0 + 10
            this.vy = 0
        }
        if (this.y > c.height - 10) {
            this.y = c.height - 10
            this.vy = 0
        }

        if (this.x > c.width - 10) {
            this.x = c.width - 10
            this.vx = 0
        }
        if (this.x < 0 + 10) {
            this.x = 0 + 10
            this.vx = 0
        }

    }

}

//This creates an instance of the ship.
var ship = new PlayerShip

//Adding event listeners.
document.addEventListener("keydown", keyPressDown)
document.addEventListener("keyup", keyPressUp)

function keyPressUp(e) {
    //console.log("Key released " + e.keyCode)
    if (e.keyCode === 39) {
        ship.right = false
    }
    if (e.keyCode === 37) {
        ship.left = false
    }
    if (e.keyCode === 38) {
        ship.up = false
    }
}

function keyPressDown(e) {
    //console.log("Key pressed " + e.keyCode)
    if (e.keyCode === 38) {
        ship.up = true
    }
    if (e.keyCode === 39) {
        ship.right = true
    }
    if (e.keyCode === 37) {
        ship.left = true
    }
}

function main() {
    ctx.clearRect(0, 0, c.width, c.height)

    //Draws score to the HUD.
    ctx.save()
    ctx.font = "15px Arial"
    ctx.fillStyle = "white"
    ctx.fillText("Score: " + score.toString(), c.width - 150, 30)
    ctx.restore()
    //ship.vy += gravity

    //Key presses move the ship.
    if (ship.up == true) {
        ship.vy = -10
    }
    else {
        ship.vy = 3
    }
    if (ship.left == true) {
        ship.vx = -3
    }
    else if (ship.right == true) {
        ship.vx = 3
    }
    else {
        ship.vx = 0
    }

    //Loops through asteroid instances in array and draws them to screen.
    for (var i = 0; i < asteroids.length; i++) {
        var dX = ship.x - asteroids[i].x
        var dY = ship.y - asteroids[i].y
        var dist = Math.sqrt((dX * dX) + (dY * dY))

        //This condition will check for collision between asteroids and ship.
        if (detectCollision(dist, (ship.h / 2 + asteroids[i].radius))) {
            console.log("Colliding with asteroid " + i)
            gameOver = true
            document.removeEventListener("keydown", keyPressDown)
            document.removeEventListener("keyup", keyPressUp)
        }

        //Recycles asteroids in the canvas.
        if (asteroids[i].y > c.height + asteroids[i].radius) {
            asteroids[i].y = randomRange(c.height - asteroids[i].radius, asteroids[i].radius) - c.height
            asteroids[i].x = randomRange(c.width + asteroids[i].radius, asteroids[i].radius)
        }

        //This moves the asteroids down the screen.
        if (gameOver == false) {
            asteroids[i].y += asteroids[i].vy
        }
        asteroids[i].draw()
    }

    ship.draw()
    if (gameOver == false) {
        ship.move()
    }

    while (asteroids.length < numAsteroids) {
        asteroids.push(new Asteroids())
    }

    timer = requestAnimationFrame(main)
}

function detectCollision(distance, calcDistance) {
    return distance < calcDistance
}

function scoreTimer() {
    if (gameOver == false) {
        score++

        //Using modulus divie the score by 5, and if the remainder is zero, add asteroids.
        if (score % 5 == 0) {
            numAsteroids += 10
            console.log(numAsteroids)
        }
        //console.log(score)
        setTimeout(scoreTimer, 1000)
    }
}

scoreTimer()