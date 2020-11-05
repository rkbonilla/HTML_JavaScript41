//JavaScript goes here

var c = document.querySelector('canvas');
var ctx = c.getContext('2d');

//Example for loading images to canvas
var sanic = new Image();
sanic.src = 'images/sanic.png';

var FinishLine = new Image()
FinishLine.src = "images/finishline.png"

var StartLine = new Image()
StartLine.src = "images/startline.png"

var x = 0;

//Timer
var timer = requestAnimationFrame(main);

//variables for starting and finish line
var start = 58;
var finish = 956;

// fuel variables
var startFuel = 194;
var fuel = startFuel;
var barFullWidth = 512;

//Start timer Stuff
var sec = 3;
var fps = 60;
var frames = fps;




function main() {
    timer = requestAnimationFrame(main);
    //clear the canvas
    ctx.clearRect(0, 0, 1024, 768);
    //draw the game objects
    drawStartLine();
    drawFinishLine();
    //drawBox();
    drawSprite();
    drawFuelBar();
    drawFuelText();

    if (sec > 0) {
        runStartTimer();
        drawStartTimer();
    }
    else {
        if (fuel > 0) {
            //update x
            x += 5;
            fuel -= 1;
        }
    }


    //Draw some Text
    ctx.lineWidth = 3;
    ctx.font = "50px Fredoka One";
    ctx.textAlign = 'center';
    ctx.fillStyle = "gold"
    ctx.strokeStyle = "black"
    ctx.fillText("Race to the Finish!", c.width / 2, 50,);
    ctx.strokeText("Race to the Finish!", c.width / 2, 50,);


    //checks to see if player made it to finish line
    if (fuel <= 0 || x + 50 > finish) {
        drawResults();
    }



}

/*function drawBox() {
    ctx.fillStyle = 'purple';
    ctx.fillRect(x, c.height / 2, 100, 50);
}*/

function drawSprite() {
    //draw image to canvas
    ctx.drawImage(sanic, x, c.height / 2 + 125, 50, 50);
}

function drawStartLine() {
    ctx.lineWidth = 5
    ctx.strokeStyle = "black"
    ctx.strokeRect(start, 300, 20, 400)
    ctx.drawImage(StartLine, start, 300, 20, 400);
}

function drawFinishLine() {
    ctx.lineWidth = 5
    ctx.strokeStyle = "black"
    ctx.strokeRect(finish, 300, 20, 400)
    ctx.drawImage(FinishLine, finish, 300, 20, 400);
}

function drawFuelBar() {
    var barCurrentWidth = barFullWidth * getFuelPercentage();

    ctx.lineWidth = 5
    ctx.fillStyle = 'gold'
    ctx.strokeStyle = "black"
    ctx.fillRect(start, 80, barCurrentWidth, 20);
    ctx.strokeRect(start, 80, 512, 20)
}

function drawFuelText() {
    ctx.lineWidth = 3
    ctx.strokeStyle = "black"
    ctx.fillStyle = 'white';
    ctx.font = '50px Fredoka One';
    ctx.fillText(fuel, start, 50);
    ctx.strokeText(fuel, start, 50)
}

function getFuelPercentage() {
    return fuel / startFuel;
}

function drawResults() {
    if (x + 50 > finish) {
        //Winning Condition
        ctx.lineWidth = 3
        ctx.strokeStyle = "black"
        ctx.fillStyle = 'white';
        ctx.font = '50px Fredoka One';
        ctx.textAlign = 'center';
        ctx.fillText("Now that's TRUE SPEED! You Won!", c.width / 2, c.height / 3);
        ctx.strokeText("Now that's TRUE SPEED! You Won!", c.width / 2, c.height / 3);
    }
    else {
        //Losing Condition
        ctx.lineWidth = 3
        ctx.strokeStyle = "black"
        ctx.fillStyle = 'white';
        ctx.font = '50px Fredoka One';
        ctx.textAlign = 'center';
        ctx.fillText("C'mon step it up!!! You lose!", c.width / 2, c.height / 3);
        ctx.strokeText("C'mon step it up!!! You lose!", c.width / 2, c.height / 3);
    }

}

function runStartTimer() {
    frames -= 1;
    if (frames < 0) {
        frames = fps;
        sec -= 1;
    }
}

function drawStartTimer() {
    ctx.lineWidth = 3
    ctx.strokeStyle = "black"
    ctx.fillStyle = 'white';
    ctx.font = '100px Fredoka One';
    ctx.textAlign = 'center';
    ctx.fillText(sec, c.width / 2, c.height / 2);
    ctx.strokeText(sec, c.width / 2, c.height / 2)
}