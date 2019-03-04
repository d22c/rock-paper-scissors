window.onload = function () {

    //array arranged so that each successive element wins against the previous element (note: options[0] wins agains options[options.length-1])
    //game logic in playGame(x,y) is dependent on array being ordered this way
    let options = ['ROCK', 'PAPER', 'SCISSORS'];
    //initialize user and computer choices to a random element
    let compChoice = 'rock';
    let userChoice = 'rock';

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
        console.log('Computer Selection: ' + compChoice);
        return compChoice;

    }

    //prompts the user give his selection
    function userPlay() {
        userChoice = prompt('Choose one of the following: ' + options.join(", ") + '.');
        if (userChoice.toUpperCase() === 'ROCK' || userChoice.toUpperCase() === 'PAPER' || userChoice.toUpperCase() === 'SCISSORS') {
            console.log('User Selection: ' + userChoice.toUpperCase());
        }
        else {
            console.log('Invalid selection. Please choose again.');
            return userPlay();
        }
        return userChoice.toUpperCase();
    }

    //plays a round, if a tie occurs the function is recursively called until there is a winner
    //returns an array containing a message of who won the round, the user's score, and the computer's score

    //rather than using nested if statements, this function compares the elements' indices in the array
    //this will allow better for flexibility and maintainability in regards to game and choice expansion in the future 
    function playRound(userSelection, computerSelection, userScore, computerScore) {
        let userX = options.indexOf(userSelection.toUpperCase());
        let compX = options.indexOf(computerSelection);

        if (userX === compX) {
            console.log('Tie! Please re-choose.');
            computerSelection = computerPlay();
            userSelection = userPlay();
            return playRound(userSelection, computerSelection, userScore, computerScore);
        }
        if ((compX == options.length - 1) && (userX == 0)) {
            userScore++;
            return ['The user wins. ' + userSelection + ' beats ' + computerSelection + '.', userScore, computerScore];
        }
        if ((userX == options.length - 1) && (compX == 0)) {
            computerScore++;
            return ['The computer wins. ' + computerSelection + ' beats ' + userSelection + '.', userScore, computerScore];
        }
        if (userX > compX) {
            userScore++;
            return ['The user wins. ' + userSelection + ' beats ' + computerSelection + '.', userScore, computerScore];
        }
        else {
            computerScore++;
            return ['The computer wins. ' + computerSelection + ' beats ' + userSelection + '.', userScore, computerScore];
        }

    }

    function game() {

        let playCheck = prompt('Do you want to play a game (best of 5) of rock, paper, scissors? [Y for yes, any other key for no]');
        if (playCheck.toUpperCase() == 'Y') {
            let userScore = 0;
            let compScore = 0;
            for (let i = 0; i < 5; i++) {
                if ((userScore - compScore > 2) || (compScore - userScore > 2)) {
                    break;
                }

                compChoice = computerPlay();
                userChoice = userPlay();
                let roundResults = playRound(userChoice, compChoice, userScore, compScore);
                let roundMsg = roundResults[0];
                userScore = roundResults[1];
                compScore = roundResults[2];
                console.log(roundMsg);
                console.log('Scoreboard: User - ' + userScore + ". Computer - " + compScore + ".");
            }

            if (userScore > compScore) {
                console.log('Congrats! You won.');
            }
            else {
                console.log('Sorry. You lost.');
            }

        }
        else {
            console.log('Did not play.');
        }

    }

    game();

};

