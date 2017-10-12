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
    audioElement: document.getElementById("gangnam-audio"),

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

    checkLetterAndUpdateStats: function(letter) {
        // Check if/where letter belongs in word
        var isLetterInWord = false;
        for (var i = 0; i < this.randomWord.length; i++) {
            if (this.randomWord[i] === letter) {
                isLetterInWord = true;
            }
        }

        // Check if letter is in the alphabet
        var isLetter = false;
        var alphabet = "abcdefghijklmnopqrstuvwxyz";
        if (alphabet.toUpperCase().includes(letter)) {
            isLetter = true;
        }

        // Check if letter has already been guessed
        var hasBeenGuessed = false;
        if (this.currentGuesses.join('').includes(letter)) {
            hasBeenGuessed = true;
        }

        // If user's guess is not a letter
        if (!isLetter) {
            return;
        }
        // If user's guess is a letter
        else {
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

            // Play audio
            this.audioElement.play();

            // Make psy gif appear & dance across page
            this.psyDancesAcrossPage();

            // confirm("You got that gangnam style~\nNew game?");

            // Update game display
            document.getElementById("wins").innerHTML = this.wins;

            // Reset game
            this.initGame();
        }

        // Testing & Debugging
        console.log("Wins: " + this.wins + " | Losses: " + this.losses + " | Guesses Left: " + this.guessesLeft);
        console.log(this.underscores.join(''));
        
    },

    psyDancesAcrossPage: function() {
        // $("#gif").css("display", "unset");
        // $("#gif").css({'left':'-300','opacity':'1'});
        // $("#gif").animate({'left':'800','opacity':'0'}, 8000, function(){
        //     $(this).css({'left':'-800', 'opacity':'0'});
        // });
        $("#gif").show().delay(1000).fadeOut();
    }

}

// MAIN PROCESS
// =====================================================================================
hangmanGame.initGame();

document.onkeyup = function(event) {
    var userGuess = event.key.toUpperCase();
    hangmanGame.checkLetterAndUpdateStats(userGuess);
    hangmanGame.winOrLose();

    // Testing & Debugging
    console.log(userGuess);
}