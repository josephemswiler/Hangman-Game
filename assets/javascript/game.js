(function () {

    var alpha = [];
    var guessedAlpha = [];
    var correctGuessedAlpha = [];
    var guessCount = 6;
    var winCount = 0;
    var movieChoices = ["Jurassic World", "Star Wars", "Indiana Jones", "Wonder Woman", "Get Out", "Logan", "The Big Sick"];
    var selectedTitle = [];
    var gameOn = false;
    var charCodes = [];
    var movieTitle = movieChoices[Math.floor(Math.random() * movieChoices.length)];
    movieTitle = movieTitle.toLowerCase();
    var correctGuess = false;
    var currentState = [];



    function createAlphabet() {
        for (var i = 0; i < 26; i++) {
            var newAnchor = document.createElement("a");
            newAnchor.innerHTML = (i + 10).toString(36).toUpperCase();
            newAnchor.setAttribute("class", ((i + 10).toString(36)));
            document.querySelector(".letters-to-guess").appendChild(newAnchor);
            alpha.push((i + 10).toString(36));
        }
    }

    document.body.onload = createAlphabet;

    var keyFunction = function (event) {

        function startGame() {

            for (var j = 0; j < movieTitle.length; j++) {

                charCodes.push(movieTitle.charCodeAt(j));

                var titleLetters = document.createElement("span");
                //if space, show, else hide character
                if (movieTitle.charCodeAt(j) === 32) {
                    titleLetters.innerHTML = " ";
                } else {
                    titleLetters.innerHTML = "-";
                    selectedTitle.push(movieTitle[j]);
                }
                //show non-alpha characters
                if (movieTitle.charCodeAt(j) < 65) {
                    titleLetters.innerHTML = movieTitle.charAt(j);
                }
                //number class
                //titleLetters.setAttribute("class", "letter-" + j);
                //letter class
                titleLetters.setAttribute("class", "letter-" + movieTitle.charAt(j));
                document.querySelector(".movie-title").appendChild(titleLetters);

                //console.log(selectedTitle);
                gameOn = true;
            }

        } // /startGame

        //run startGame
        if (guessCount > 0 && gameOn === false) {
            document.querySelector(".main").style.display = 'none';
            startGame();
        }

        //check for correct guess of letter
        for (var k = 0; k < movieTitle.length; k++) {

            if (event.key === movieTitle.charAt(k)) {
                //var classString = ".letter-" + movieTitle.indexOf(event.key);
                //document.querySelector(classString).innerHTML = movieTitle.charAt(k);

                //var classString = ".letter-" + event.key;
                //document.querySelector(classString).innerHTML = event.key;

                var correctClass = document.body.querySelectorAll(".letter-" + event.key);

                for (var l = 0; l < correctClass.length; l++) {
                    correctClass[l].innerHTML = event.key;
                    //console.log(correctClass[l]);
                }
                correctGuess = true;
                correctGuessedAlpha.push(event.key);
                //console.log(correctGuessedAlpha);
                
                //check if game is over
                /*
                for (var m = 0; m < selectedTitle.length; m++) {
                    var isWin = correctClass[m].innerHTML
                    if (isWin.indexOf("-") !== -1 )
                }
                */

                var childTitles = document.querySelector(".movie-title").children;
                for (var m = 0; m < childTitles.length; m++) {
                    //correctClass[l].innerHTML = event.key;
                    
                    currentState.splice(m,1,childTitles[m].innerHTML);
                }

                if (currentState.indexOf("-") === -1) {
                    console.log('win bruh!');
                    winCount++
                    document.querySelector(".win-count").innerHTML = winCount;
                    document.querySelector(".already-guessed").innerHTML = "YOU WIN! Click here to play again!";
                    document.querySelector(".already-guessed").style.visibility = 'visible';
                }

            }

        }

        //remove letters already guessed from alphabet array
        if (alpha.indexOf(event.key) !== -1) {
            document.querySelector("." + event.key).innerHTML = "-";
        }
        //check if letter has already been guessed
        if ((alpha.indexOf(event.key) === -1) && (guessedAlpha.indexOf(event.key) === -1)) {

        } else if ((alpha.indexOf(event.key) === -1)) {
            document.querySelector(".already-guessed").innerHTML = event.key.toUpperCase() + " already guessed!";
            document.querySelector(".already-guessed").style.visibility = 'visible';

            setTimeout(function () {
                document.querySelector(".already-guessed").style.visibility = 'hidden';
            }, 1000);

        } else {
            var guess = alpha.splice(alpha.indexOf(event.key), 1);
            guess = guess.join();
            guessedAlpha.push(guess);

            if (guessCount < 1) {
                document.querySelector(".main").innerHTML = "GAME OVER";
                document.querySelector(".main").style.display = 'block';
                document.querySelector(".movie-title").style.display = 'none';
                //alert to play again?
                //document.querySelector(".already-guessed").innerHTML = "Play Again"
                //show answer, might want to make two divs for messages and game play

                //reset game
            } else if (correctGuess === false) {
                guessCount--
                document.querySelector(".guess-counter").innerHTML = guessCount;
            } else {
                correctGuess = false;
            }
        }
        //check if game is over



    } // /keyFunction



    document.onkeydown = keyFunction;



    //blinking text
    var textHidden = false;

    setInterval(textBlink, 500);

    function textBlink() {
        if (textHidden) {
            document.querySelector(".main").style.visibility = 'visible';
        } else {
            document.querySelector(".main").style.visibility = 'hidden';
        }
        textHidden = !textHidden;
    } // /blinking text

}()) // /function