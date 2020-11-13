var c = document.querySelector("canvas")
var ctx = c.getContext("2d")

var rps = []
rps[0] = 'Rock'
rps[1] = 'Paper'
rps[2] = 'Scissors'

//Array of Buttons
var btn = document.querySelectorAll('a')
//assign event listeners to the buttons
btn[0].addEventListener('click', function (e) { play(0) })
btn[1].addEventListener('click', function (e) { play(1) })
btn[2].addEventListener('click', function (e) { play(2) })

function youWin(){
    ctx.lineWidth = 1;
    ctx.font = "50px Fredoka One";
    ctx.textAlign = 'center';
    ctx.fillStyle = "green"
    ctx.strokeStyle = "black"
    ctx.fillText("You Win!", c.width / 2, c.height / 3)
    ctx.strokeText("You Win!", c.width / 2, c.height / 3)
}

function youLose(){
    ctx.lineWidth = 1;
    ctx.font = "50px Fredoka One";
    ctx.textAlign = 'center';
    ctx.fillStyle = "red"
    ctx.strokeStyle = "black"
    ctx.fillText("You Lose!", c.width / 2, c.height / 3)
    ctx.strokeText("You Lose!", c.width / 2, c.height / 3)
}

function youTie(){
    ctx.lineWidth = 1;
    ctx.font = "50px Fredoka One";
    ctx.textAlign = 'center';
    ctx.fillStyle = "gold"
    ctx.strokeStyle = "black"
    ctx.fillText("It's a tie!", c.width / 2, c.height / 3)
    ctx.strokeText("It's a tie!", c.width / 2, c.height / 3)
}



function play(playersChoice) {
    var cpuChoice = Math.floor(Math.random() * 2.999)
    ctx.clearRect(0, 0, 1000, 600)
    ctx.lineWidth = 1;
    ctx.font = "30px Fredoka One";
    ctx.textAlign = 'center';
    ctx.fillStyle = "gold"
    ctx.strokeStyle = "black"
    ctx.fillText("Player Choice: " + rps[playersChoice] + " vs. Computer Choice: " + rps[cpuChoice], c.width / 2, c.height / 1.5)
    ctx.strokeText("Player Choice: " + rps[playersChoice] + " vs. Computer Choice: " + rps[cpuChoice], c.width / 2, c.height / 1.5)

    switch(playersChoice){
        case 0: 
            if(cpuChoice === 0){
                youTie()
            }
            else if(cpuChoice === 1){
                youLose()
            }
            else{
                youWin()
            }
            break
        case 1:
            if(cpuChoice === 0){
                youWin()
            }
            else if(cpuChoice === 1){
                youTie()
            }
            else{
                youLose()
            } 
            break
        case 2:
            if(cpuChoice === 0){
                youLose()
            }
            else if(cpuChoice === 1){
                youWin()
            }
            else{
                youTie()
            } 
            break
    }
}