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





function play(playersChoice) {
    var cpuChoice = Math.floor(Math.random() * 2.999)
    alert("Player Choice: " + rps[playersChoice] + " vs. Computer Choice: " + rps[cpuChoice])

    switch(playersChoice){
        case 0: 
            if(cpuChoice === 0){
                alert("It's a tie!")
            }
            else if(cpuChoice === 1){
                alert("You Lost!")
            }
            else{
                alert("You Win!")
            }
            break
        case 1:
            if(cpuChoice === 0){
                alert("You Win!")
            }
            else if(cpuChoice === 1){
                alert("It's a tie!")
            }
            else{
                alert("You Lose!")
            } 
            break
        case 2:
            if(cpuChoice === 0){
                alert("You Lose!")
            }
            else if(cpuChoice === 1){
                alert("You Win!")
            }
            else{
                alert("It's a tie!!")
            } 
            break
    }
}