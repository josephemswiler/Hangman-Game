(function () {

    var alpha = [];
    var guessedAlpha = [];
    var guessCount = 6;
    var movieChoices = ["Jurassic World", "Star Wars: The Force Awakens", "Avengers: Age of Ultron", "Inside Out", "Furious 7", "Minions"];
    var selectedTitle = [];
    var gameOn = false;
    var charCodes = [];
    var movieTitle = movieChoices[0]; //Math.floor(Math.random() * movieChoices.length)];
    movieTitle = movieTitle.toLowerCase();
    var correctGuess = false;


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

            for (var j = 0; j < movieTitle.length - 1; j++) {

                charCodes.push(movieTitle.charCodeAt(j));

                var titleLetters = document.createElement("span");
                if (movieTitle.charCodeAt(j) === 32) {
                    titleLetters.innerHTML = " ";
                } else {
                    titleLetters.innerHTML = "-";
                }
                titleLetters.setAttribute("class", "letter-" + j);
                document.querySelector(".movie-title").appendChild(titleLetters);
                selectedTitle.push(movieTitle[j]);
                gameOn = true;
            }
            /*
            if (movieTitle.indexOf(event.key) !== -1) {
                var getClass = ("." + k)
                getClass = getClass.toString();
                console.log(getClass);
                document.querySelector(getClass).innerHTML = event.key;
            }
            */

        } // /startGame

        //run startGame
        if (guessCount > 0 && gameOn === false) {
            document.querySelector(".main").style.display = 'none';
            startGame();
        }
        //check for correct guess of letter
        for (var k = 0; k < movieTitle.length - 1; k++) {

            if (event.key === movieTitle.charAt(k)) {
                var classString = ".letter-" + movieTitle.indexOf(event.key);
                document.querySelector(classString).innerHTML = movieTitle.charAt(k);
                correctGuess = true;
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
    }
    //blinking text

}())