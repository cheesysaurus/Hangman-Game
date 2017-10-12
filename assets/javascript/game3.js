// GAME OBJECT
// =====================================================================================
var hangmanGame = {

    // GLOBAL VARIABLES
    // =====================================================================================
    wins: 0,
    losses: 0,
    guessesLeft: 15,
    underscores: [],
    currentGuesses: [],
    wordOptions: ["psy", "gangnam", "style", "oppa", "shades", "explosion", "dance", "horse"],
    randomWord: '',

    // FUNCTIONS
    // =====================================================================================
    initGame: function() {
        // Generate new word
        this.randomWord = this.wordOptions[Math.floor(Math.random() * this.wordOptions.length)].toUpperCase();

        // Reset underscores, guesses left, current guesses
        this.guessesLeft = 15;
        this.currentGuesses = [];
        this.underscores = [];

        // Display correct number of underscores for current word
        for (var i = 0; i < this.randomWord.length; i++) {
            this.underscores.push("_");
        }

        // Update game display
        document.getElementById("currentGuesses").innerHTML = this.currentGuesses;
        document.getElementById("guessesLeft").innerHTML = this.guessesLeft;
        document.getElementById("underscores").innerHTML = this.underscores.join(' ');

        // Testing & Debugging
        console.log(this.randomWord);
        console.log(this.underscores);
    },

    findLetterAndUpdateStats: function(letter) {
        var isLetterInWord = false;
        // Find all indices of user's guess in current word (if any)
        for (var i = 0; i < this.randomWord.length; i++) {
            if (this.randomWord[i] === letter) {
                isLetterInWord = true;
            }
        }

        // Check if letter has already been guessed
        var hasBeenGuessed = false;
        if (this.currentGuesses.join('').includes(letter)) {
            hasBeenGuessed = true;
        }

        // If letter has already been guessed
        if (hasBeenGuessed) {
            alert("You already guessed \"" + letter + "\"");
        }
        // If letter has not been guessed yet
        else {
             // If user's guess belongs in word
            if (isLetterInWord) {
                // Update the appropriate underscores
                for (var j = 0; j < this.randomWord.length; j++) {
                    if (this.randomWord[j] === letter) {
                        this.underscores[j] = letter;
                    }
                }
                this.currentGuesses.push(" " + letter);
                this.guessesLeft--;
            }
            // If user's guess does not belong not in word
            else {
                this.currentGuesses.push(" " + letter);
                this.guessesLeft--;
            }
        }

       
    },

    winOrLose: function() {
        // Update game display
        document.getElementById("currentGuesses").innerHTML = this.currentGuesses;
        document.getElementById("guessesLeft").innerHTML = this.guessesLeft;
        document.getElementById("underscores").innerHTML = this.underscores.join(' ');

        // If guesses run out (user loses)
        if (this.guessesLeft === 0) {
            this.losses++;
            confirm("Oh no! The correct word was \"" + this.randomWord + "\".\nWould you like to play again?");

            // Update game display
            document.getElementById("losses").innerHTML = this.losses;

            // Reset game
            this.initGame();
        }
        // If user still has guesses left and guesses entire word (user wins)
        else if (this.underscores.join('') === this.randomWord) {
            this.wins++;
            confirm("You got that gangnam style~\nNew game?");

            // Update game display
            document.getElementById("wins").innerHTML = this.wins;

            // Reset game
            this.initGame();
        }

        // Testing & Debugging
        console.log("Wins: " + this.wins + " | Losses: " + this.losses + " | Guesses Left: " + this.guessesLeft);
        console.log(this.underscores.join(''));
        
    } // winOrLose() (Line 91)

} // hangmanGame (Line 3)

// MAIN PROCESS
// =====================================================================================
hangmanGame.initGame();

document.onkeyup = function(event) {
    var userGuess = event.key.toUpperCase();
    hangmanGame.findLetterAndUpdateStats(userGuess);
    hangmanGame.winOrLose();

    // Testing & Debugging
    console.log(userGuess);
}