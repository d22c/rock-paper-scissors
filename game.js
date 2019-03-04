window.onload = function () {

    //array arranged so that each successive element wins against the previous element
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
        if (userChoice.toUpperCase() === 'ROCK' || 'PAPER' || 'SCISSORS') {
            console.log('User Selection: ' + userChoice.toUpperCase());
        }
        else {
            console.log('Invalid selection. Please choose again.');
            return userPlay();
        }
        return userChoice.toUpperCase();
    }

    //plays a round, if a tie occurs the function is recursively called until there is a winner
    function playGame(userSelection, computerSelection) {
        console.log(userSelection + " & " + computerSelection);
        let userX = options.indexOf(userSelection.toUpperCase());
        let compX = options.indexOf(computerSelection);

        if (userX === compX) {
            console.log('Tie! Please re-choose.');
            computerSelection = computerPlay();
            userSelection = userPlay();
            return playGame(userSelection, computerSelection);
        }
        if (userX == options.length - 1 && compX == 0) {
            return 'The user wins. ' + userSelection + ' beats ' + computerSelection + '.';
        }
        if (compX == options.length - 1 && userX == 0) {
            return 'The computer wins. ' + computerSelection + ' beats ' + userSelection + '.';
        }
        if (userX > compX) {
            return 'The user wins. ' + userSelection + ' beats ' + computerSelection + '.';
        }
        else {
            return 'The computer wins. ' + computerSelection + ' beats ' + userSelection + '.';
        }

    }

    let playCheck = prompt('Do you want to play a round of rock, paper, scissors? [Y for yes, any other key for no]');
    if (playCheck.toUpperCase() == 'Y') {
        compChoice = computerPlay();
        userChoice = userPlay();
        let roundResult = playGame(userChoice, compChoice);
        console.log(roundResult);
    }
    else{
        console.log('Did not play.');
    }
};

