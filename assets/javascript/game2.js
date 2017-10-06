// create object of arrays containing word bank
var wordBank = {
    normal: ["psy", "gangnam", "shades", "style", "horse", "explosion"],
    underscore: ["___", "_______", "______", "_____", "_____", "_________"]
};

// function for new game
function initGame() {
    // generate new word
    randomWord = wordBank.normal[Math.floor(Math.random() * wordBank.normal.length)];
    console.log(randomWord);

    guessesLeft = 15;
    currentGuesses = [];

    // display length of word to user as underscores
    randomWordIndex = wordBank.normal.indexOf(randomWord);
    underscoreSplit = wordBank.underscore[randomWordIndex].split('');
    underscoreJoined = underscoreSplit.join(' ');
    currentWord = document.getElementById("underscores").innerHTML = underscoreJoined;
    randomWordSplit = randomWord.split('');
}

// initialize variables
var wins = 0;
var losses = 0;
var guessesLeft;
var currentGuesses;

// assign what is displayed to the user to a variable
var userDisplay = document.getElementById("game-display");

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

        // if letter has not been guessed
        if (currentGuesses.indexOf(userGuess.toUpperCase()) === -1) {

            // if letter belongs in word
            if (randomWord.indexOf(userGuess) > -1) {
            
                // find all indices where the letter belongs & replace underscore at those indices with letter
                for (var i = 0; i < randomWord.length; i++) {
                    var indicesOfLetter = [];
                    if (randomWord[i] === userGuess) {
                        indicesOfLetter.push(i);
                        underscoreSplit[indicesOfLetter] = userGuess;
                    }
                }

                currentWord = underscoreSplit.join(' ');
                console.log(indicesOfLetter);
                console.log(underscoreSplit);
                console.log(randomWordSplit.join(' '));
                console.log(currentWord);
    
                // decrement guesses left
                guessesLeft--;
    
                // push guess to array of letters guessed
                currentGuesses.push(" " + userGuess.toUpperCase());

                // if user guesses entire word
                if (currentWord === randomWordSplit.join(' ')) {
            
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

        // if letter has already been guessed
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

    // update game display
    var html =
        "<p>Wins: " +  wins + "<br /><br />" +
        "Losses: " + losses + "<br /><br />" + 
        "Current Word: " + currentWord + "<br /><br />" + 
        "Number of Guesses Remaining: " + guessesLeft + "<br /><br />" + 
        "Letters Already Guessed: " + currentGuesses + "</p>";
    
    userDisplay.innerHTML = html;
}
initGame();