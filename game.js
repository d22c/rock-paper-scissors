window.onload = function () {
    const btns = document.querySelectorAll('button')
    const compInfo = document.querySelector('.computerInfo');
    const userInfo = document.querySelector('.playerInfo');
    const finalTotal = document.querySelector('.finalTotal');
    const roundResults = document.querySelector('.roundResult');
    //array arranged so that each successive element wins against the previous element (note: options[0] wins agains options[options.length-1])
    //game logic in playGame(x,y) is dependent on array being ordered this way
    let options = ['ROCK', 'PAPER', 'SCISSORS'];
    //initialize variables to empty strings
    let compChoice = '';
    let userChoice = '';
    let userScore = 0;
    let compScore = 0;
    let roundMsg = '';

    //generates the computer's selection
    function computerPlay() {
        let numGen = Math.random();
        if (numGen < 0.34) {
            compChoice = 'ROCK';
        }
        else if (numGen <= 0.67) {
            compChoice = 'PAPER';
        }
        else {
            compChoice = 'SCISSORS';
        }
        console.log('Computer Choice: ' + compChoice);
        return compChoice;

    }

    //plays a round, if a tie occurs the function is recursively called until there is a winner
    //returns an array containing a message of who won the round, the user's score, and the computer's score

    //rather than using nested if statements, this function compares the elements' indices in the array
    //this will allow better for flexibility and maintainability in regards to game and choice expansion in the future 
    function playRound(userSelection, computerSelection, userScore, computerScore) {
        let userX = options.indexOf(userSelection);
        let compX = options.indexOf(computerSelection);

        if (userX === compX) {
            roundResults.textContent = 'Tie! Please re-choose.';
            return['Tie! Please choose again.', userScore, computerScore]
        }
        if ((compX == options.length - 1) && (userX == 0)) {
            userScore++;
            return ['The user wins the round. ' + userSelection + ' beats ' + computerSelection + '.', userScore, computerScore];
        }
        if ((userX == options.length - 1) && (compX == 0)) {
            computerScore++;
            return ['The computer wins the round. ' + computerSelection + ' beats ' + userSelection + '.', userScore, computerScore];
        }
        if (userX > compX) {
            userScore++;
            return ['The user wins the round. ' + userSelection + ' beats ' + computerSelection + '.', userScore, computerScore];
        }
        else {
            computerScore++;
            return ['The computer wins the round. ' + computerSelection + ' beats ' + userSelection + '.', userScore, computerScore];
        }

    }

    btns.forEach((button) => {
        button.addEventListener('click', (e) => {
            finalTotal.textContent = '';
            let roundRes = playRound(button.textContent, computerPlay(), userScore, compScore);
            roundMsg = roundRes[0];
            userScore = roundRes[1];
            compScore = roundRes[2];
            userInfo.textContent = 'User Score: ' + userScore;
            compInfo.textContent = 'Computer Score: ' + compScore;
            roundResults.textContent = roundMsg;
            console.log('Scoreboard: User - ' + userScore + ". Computer - " + compScore + ".");

            if(userScore==5){
                finalTotal.textContent = 'Congrats! You won the game.';
                userScore = 0;
                compScore = 0;
            }
            if(compScore==5){
                finalTotal.textContent = 'Sorry. You lost the game...';
                userScore = 0;
                compScore = 0;
            }

        });


    });


};

