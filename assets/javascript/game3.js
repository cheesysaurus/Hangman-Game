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
    winAudio: document.getElementById("win-audio"),
    loseAudio: document.getElementById("lose-audio"),
    keystrokeAudio: document.getElementById("keystroke-audio"),

    // FUNCTIONS
    // =====================================================================================
    initGame: function() {
        // Generate new word
        hangmanGame.randomWord = hangmanGame.wordOptions[Math.floor(Math.random() * hangmanGame.wordOptions.length)].toUpperCase();

        // Reset underscores, guesses left, current guesses
        hangmanGame.guessesLeft = 15;
        hangmanGame.currentGuesses = [];
        hangmanGame.underscores = [];

        // Display correct number of underscores for current word
        for (var i = 0; i < hangmanGame.randomWord.length; i++) {
            hangmanGame.underscores.push("_");
        }

        // Update game display
        document.getElementById("currentGuesses").innerHTML = hangmanGame.currentGuesses;
        document.getElementById("guessesLeft").innerHTML = hangmanGame.guessesLeft;
        document.getElementById("underscores").innerHTML = hangmanGame.underscores.join(' ');

        // Testing & Debugging
        console.log(hangmanGame.randomWord);
        console.log(hangmanGame.underscores);
    },

    checkLetterAndUpdateStats: function(letter) {
        // Check if/where letter belongs in word
        var isLetterInWord = false;
        for (var i = 0; i < hangmanGame.randomWord.length; i++) {
            if (hangmanGame.randomWord[i] === letter) {
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
        if (hangmanGame.currentGuesses.join('').includes(letter)) {
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
                    for (var j = 0; j < hangmanGame.randomWord.length; j++) {
                        if (hangmanGame.randomWord[j] === letter) {
                            hangmanGame.underscores[j] = letter;
                        }
                    }
                    hangmanGame.currentGuesses.push(" " + letter);
                    hangmanGame.guessesLeft--;
                }
                // If user's guess does not belong not in word
                else {
                    hangmanGame.currentGuesses.push(" " + letter);
                    hangmanGame.guessesLeft--;
                }
            }
        }

        // Remove class "flash" from win/loss score so that it can be added back each time user wins/loses
        if (hangmanGame.guessesLeft === 14) {
            $("#win-display").removeClass("flash");
            $("#loss-display").removeClass("flash");
        }

    },

    winOrLose: function() {
        // Update game display
        document.getElementById("currentGuesses").innerHTML = hangmanGame.currentGuesses;
        document.getElementById("guessesLeft").innerHTML = hangmanGame.guessesLeft;
        document.getElementById("underscores").innerHTML = hangmanGame.underscores.join(' ');

        // If guesses run out (user loses)
        if (hangmanGame.guessesLeft === 0) {
            hangmanGame.losses++;

            // Flash score
            $("#loss-display").addClass("flash");

            // Play audio
            hangmanGame.loseAudio.play();

            confirm("Oh no! The correct word was \"" + hangmanGame.randomWord + "\".\nWould you like to play again?");
    
            // Update game display
            document.getElementById("losses").innerHTML = hangmanGame.losses;

            // Reset game
            hangmanGame.initGame();
        }
        // If user still has guesses left and guesses entire word (user wins)
        else if (hangmanGame.underscores.join('') === hangmanGame.randomWord) {
            hangmanGame.wins++;

            // Flash score
            $("#win-display").addClass("flash");

            // Play audio
            hangmanGame.winAudio.play();

            // Make psy gif appear & dance across page
            hangmanGame.psyDancesAcrossPage();

            // confirm("You got that gangnam style~\nNew game?");

            // Update game display
            document.getElementById("wins").innerHTML = hangmanGame.wins;

            // Reset game
            hangmanGame.initGame();
        }

        // Testing & Debugging
        console.log("Wins: " + hangmanGame.wins + " | Losses: " + hangmanGame.losses + " | Guesses Left: " + hangmanGame.guessesLeft);
        console.log(hangmanGame.underscores.join(''));
        
    },

    psyDancesAcrossPage: function() {
        // $("#gif").css("display", "unset");
        // $("#gif").css({'left':'-300','opacity':'1'});
        // $("#gif").animate({'left':'800','opacity':'0'}, 8000, function(){
        //     $(hangmanGame).css({'left':'-800', 'opacity':'0'});
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

    // Play audio
    // hangmanGame.keystrokeAudio.load();
    // hangmanGame.keystrokeAudio.cloneNode();
    hangmanGame.keystrokeAudio.currentTime = 0;
    hangmanGame.keystrokeAudio.play();

    // Testing & Debugging
    console.log(userGuess);
}