
/* Issues
    - Can't get the underscores to update with the letter the user types
    - Can't get the alert to pop up when user guesses a repeat letter
*/

// create array containing word bank
var wordBank = ["psy", "gangnam", "shades", "style", "horse", "explosion"];

// define functions/variables for new game
// function to generate random word
function selectWord() {
    return wordBank[Math.floor(Math.random() * wordBank.length)];
}

// function to reset/start new game
function initGame() {
    // generate new word
    randomWord = selectWord();
    console.log(randomWord);
    // display underscores
    currentWord = displayUnderscores();
    // reset game values
    guessesLeft = 15;
    currentGuesses = [];
}

// start new game
initGame();

// function to display current word as underscores
function displayUnderscores() {
    var underscores = "";
    for (var i = 0; i < randomWord.length; i++) {
        underscores += "_ ";
    }
    return document.getElementById("underscores").innerHTML = underscores;
}

// function to store indices of correct letter & update underscores at indices
// function updateUnderscores(letter) {
//     index = randomWord.indexOf(letter);
//     currentWord = currentWord.replace(index, letter);
// }

// initialize score variables
var wins = 0;
var losses = 0;

// function to check if user has already guessed a letter
// function alreadyGuessed(letter, array) {
//     return array.indexOf(letter) > -1;
// }

// when key is pressed
document.onkeyup = function(event) {

    // assign guess to variable
    var userGuess = event.key.toLowerCase();
    console.log(userGuess);
    
    // if guesses have not run out
    if (guessesLeft > 0) {

        // if letter has not been guessed (if the letter pressed does not belong in the currentGuesses array)
        if (currentGuesses.indexOf(userGuess.toUpperCase()) === -1) {

            // if letter belongs in word
            if (randomWord.indexOf(userGuess) > -1) {
            
                // find all indices where the letter belongs
                var indexArr = [];
                for (var i = 0; i < randomWord.length; i++) {
                    if (randomWord[i] === userGuess) {
                        indexArr.push(i);             
                    }
                }
                console.log(indexArr);

                // replace underscores at indices & update
                for (var j = 0; j < indexArr.length; j++) {
                    currentWord.replace(indexArr[i], userGuess);
                }
                console.log(currentWord);
                // not working
    
                // decrement guesses left
                guessesLeft--;
    
                // push guess to array of letters guessed
                currentGuesses.push(" " + userGuess.toUpperCase());

                // if user guesses entire word
                if (currentWord === randomWord) {
            
                    // increment wins
                    wins++;

                    // alert (or music/gif popup?)
                    var newGameWin = alert("You got that gangnam style~\nNew game?");

                        // if user wants to play again
                        if (newGameWin) {
                            initGame();
                        }
                }
            }

            // if letter does not belong in word
            else if (randomWord.indexOf(userGuess) === -1) {

                // decrement guesses left
                guessesLeft--;
    
                // push guess to array of letters guessed
                currentGuesses.push(" " + userGuess.toUpperCase());
            }

        }    

        // else (if letter has already been guessed)
        else {
            alert("You already guessed " + "\"" + userGuess + "\"");
        }
        // not working ^
           
    }

    // else (if guesses run out)
    else {
        // increment losses
        losses++;

        // alert user of correct word and confirm if user wants to play again
        var newWordLose = confirm("Oh no! The correct word was \"" + randomWord + "\".\nWould you like to play again?");
        // need to fix this ^ keeps alerting same word

            // if user wants to play again
            if (newWordLose) {
                initGame();
            }

        // play music or gif popup?
    }

    // assign what is displayed to the user to a variable
    var userDisplay = document.getElementById("game-display");

    // update game display
    var html =
        "<p>Wins: <span id='wins'>" +  wins + "</span><br /><br />" +
        "Losses: <span id='losses'>" + losses + "</span><br /><br />" + 
        "Current Word: <span id='underscores'>" + currentWord + "</span><br /><br />" + 
        "Number of Guesses Remaining: <span id='guessesLeft'>" + guessesLeft + "</span><br /><br />" + 
        "Letters Already Guessed: <span id='currentGuesses'>" + currentGuesses + "</span></p>";
    
    userDisplay.innerHTML = html;
}