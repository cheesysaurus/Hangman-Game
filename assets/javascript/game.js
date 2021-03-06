// create array containing words of varying lengths
var wordBank = ["psy", "gangnam", "shades", "style", "horse", "explosion"];
var wordBankUnderscore = ["_ _ _", "_ _ _ _ _ _ _", "_ _ _ _ _ _", "_ _ _ _ _", "_ _ _ _ _", "_ _ _ _ _ _ _ _ _"];
// maybe make "___" and split string with spaces --> array --> for loop
// any way to replace the letter of the string with character _?

// computer generates random word from array
var randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
console.log(randomWord);

function generateWord() {
    var randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    console.log(randomWord);
}

// initialize/display wins & losses
// initialize/display number of guesses left
// initialize/display array of letters already guessed
var wins = 0;
var losses = 0;
var guessesLeft = 15;
var currentGuesses = [];

// display length of word to user as underscores
var blankWord = wordBank.indexOf(randomWord);
if (blankWord !== -1) {
    var currentWord = document.getElementById("underscores").innerHTML = wordBankUnderscore[blankWord];
}

// assign what is displayed to the user to a variable
var userDisplay = document.getElementById("game-display");

// // function to check if user has already guessed a letter
// function alreadyGuessed(letter, array) {
//     return array.indexOf(letter) > -1;
// }

// when key is pressed
document.onkeyup = function(event) {

    // capture user guess
    var userGuess = event.key.toLowerCase();
    console.log(userGuess);
    
    if (guessesLeft > 0) {

        // if letter belongs in word
        if (randomWord.indexOf(userGuess) !== -1) {

            // replace correct underscore with letter
            currentWord.replace(randomWord.indexOf(userGuess), userGuess);
            
            // decrement guesses left
            guessesLeft--;

            // push guess to array of letters guessed
            currentGuesses.push(" " + userGuess.toUpperCase());
        }
        // if letter does not belong in word
        else if (randomWord.indexOf(userGuess) === -1) {
            // decrement guesses left
            guessesLeft--;

            // push guess to array of letters guessed
            currentGuesses.push(" " + userGuess.toUpperCase());
        }

        // if letter has already been guessed
        if (currentGuesses.includes(userGuess.toUpperCase())) {
            // do nothing (or make the letter blink for a second?)
            alert("You already guessed " + "\"" + userGuess + "\"");
        }

        // if user guesses word
            // increment wins
            // reset guesses left
            // reset current guesses
            // computer generates new word
            // play music or gif popup?
    }

    // else (if guesses run out)
    else {
        // increment losses
        losses++;

        // alert user of correct word and confirm if user wants to play again
        var newWord = confirm("Oh no! The correct word was \"" + randomWord + "\".\nWould you like to play again?");

            // if user wants to play again
            if (newWord) {

                // generate new word
                generateWord();
                currentWord;
                guessesLeft = 15;
                currentGuesses = [];
            }

        // play music of gif popup?
    }

    // update game display
    var html =
        "<p>Wins: " +  wins + "<br /><br />" +
        "Losses: " + losses + "<br /><br />" + 
        "Current Word: " + currentWord + "<br /><br />" + 
        "Number of Guesses Remaining: " + guessesLeft + "<br /><br />" + 
        "Letters Already Guessed: " + currentGuesses + "</p>";
    
    userDisplay.innerHTML = html;
}