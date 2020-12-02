var c = document.querySelector("canvas")
var ctx = c.getContext("2d")
var timer = requestAnimationFrame(main)
var gravity = 0.25
var asteroids = new Array()
var numAsteroids = 10

function randomRange(high, low) {
    return Math.random() * (high - low) + low
}

function Asteroids() {
    this.radius = randomRange(5, 10)
    this.x = randomRange(0 + this.radius, c.width - this.radius)
    this.y = randomRange(0 + this.radius, c.height - this.radius)
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
    this.w = 0
    this.h = 0
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
    console.log("Key released " + e.keyCode)
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
    console.log("Key pressed " + e.keyCode)
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
    ship.vy += gravity

    //Key presses move the ship.
    if (ship.up == true) {
        ship.vy = -3
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

    //Loops through asteroid instances in arrow and draws them to screen.
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].draw()
    }

    ship.draw()
    ship.move()
    timer = requestAnimationFrame(main)
}