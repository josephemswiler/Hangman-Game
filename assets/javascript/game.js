(function () {

    var alpha = [];
    var guessedAlpha = [];
    var correctGuessedAlpha = [];
    var guessCount = 6;
    var winCount = 0;
    var charChoices = ["Eleven", "Dustin Henderson", "Mike Wheeler", "Lucas Sinclair", "Will Byers", "Chief Hopper", "Joyce Byers", "Nancy Wheeler", "Jonathan Byers", "Steve Herrington", "Barb!", "Demogorgon"];
    var selectedChar = [];
    var charCodes = [];
    var correctGuess = false;
    var currentState = [];
    var gameOver = true;
    var charName = charChoices[Math.floor(Math.random() * charChoices.length)];
    var gameSet = true;

    charName = charName.toLowerCase();

    var audio = new Audio("assets/audio/stranger-things-music.mp3");
    audio.addEventListener('canplaythrough', function () {

        audio.play();

    }, false);

    var nameLetters;

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

    function startGame() {

        document.querySelector(".reset-game").style.display = 'none';

        document.querySelector(".main").style.display = 'none';

        for (var j = 0; j < charName.length; j++) {

            charCodes.push(charName.charCodeAt(j));

            nameLetters = document.createElement("span");

            //if space, show, else hide character
            if (charName.charCodeAt(j) === 32) {

                nameLetters.innerHTML = " ";

            } else {

                nameLetters.innerHTML = "-";
                selectedChar.push(charName[j]);

            }

            //show non-alpha characters
            if (charName.charCodeAt(j) < 65) {

                nameLetters.innerHTML = charName.charAt(j);

            }

            nameLetters.setAttribute("class", "letter-" + charName.charAt(j));
            document.querySelector(".char-name").appendChild(nameLetters);
            gameOver = false;
        }

    } // /startGame

    //check for correct guess of letter
    function checkLetter(letterToCheck) {

        for (var k = 0; k < charName.length; k++) {

            if (letterToCheck === charName.charAt(k) && gameOver === false) {

                var correctClass = document.body.querySelectorAll(".letter-" + letterToCheck);

                for (var l = 0; l < correctClass.length; l++) {

                    correctClass[l].innerHTML = letterToCheck;

                }

                correctGuess = true;

                correctGuessedAlpha.push(letterToCheck);

                //check if game is over
                var childTitles = document.querySelector(".char-name").children;

                for (var m = 0; m < childTitles.length; m++) {

                    currentState.splice(m, 1, childTitles[m].innerHTML);

                }

                if ((currentState.indexOf("-")) === -1 && (gameOver === false)) {

                    winCount++
                    document.querySelector(".win-count").innerHTML = winCount;
                    document.querySelector(".instructions").style.display = 'none';
                    document.querySelector(".already-guessed").style.display = 'none';
                    document.querySelector(".already-guessed").style.visibility = 'hidden';
                    document.querySelector(".result").innerHTML = "YOU WIN!";
                    document.querySelector(".result").style.visibility = 'visible';
                    document.querySelector(".result").style.display = 'block';
                    document.querySelector(".reset-game").style.display = 'block';
                    document.querySelector(".reset-game").innerHTML = "Play Again";
                    document.querySelector(".char-name").innerHTML = charName;
                    gameOver = true;
                    gameSet = false;

                }

            }

        } // /for loop

    } // /checkLetter

    //check if letter has already been guessed
    function isLetterGuessed(letterGuessed) {

        if (gameOver === false) {

            if ((alpha.indexOf(letterGuessed) === -1) && (guessedAlpha.indexOf(letterGuessed) === -1)) {} else if ((alpha.indexOf(letterGuessed) === -1)) {

                document.querySelector(".instructions").style.display = 'none';
                document.querySelector(".result").style.display = 'none';
                document.querySelector(".result").style.visibility = 'hidden';
                document.querySelector(".already-guessed").innerHTML = letterGuessed.toUpperCase() + " already guessed!";
                document.querySelector(".already-guessed").style.display = 'block';
                document.querySelector(".already-guessed").style.visibility = 'visible';

            } else {

                var guess = alpha.splice(alpha.indexOf(letterGuessed), 1);
                guess = guess.join();
                guessedAlpha.push(guess);

            }


            if (correctGuess === false) {

                guessCount--
                document.querySelector(".guess-counter").innerHTML = guessCount;

                if (guessCount < 1) {

                    document.querySelector(".instructions").style.display = 'none';
                    document.querySelector(".already-guessed").style.display = 'none';
                    document.querySelector(".already-guessed").style.visibility = 'hidden';
                    document.querySelector(".result").innerHTML = "GAME OVER";
                    document.querySelector(".result").style.display = 'block';
                    document.querySelector(".result").style.visibility = 'visible';
                    document.querySelector(".reset-game").style.display = 'block';
                    document.querySelector(".reset-game").innerHTML = "Play Again";
                    document.querySelector(".char-name").innerHTML = charName;
                    gameOver = true;
                    gameSet = false;
                }

            } else {

                correctGuess = false;

            }

            let timingFunction = setTimeout(function () {

                document.querySelector(".already-guessed").style.display = 'none';
                document.querySelector(".already-guessed").style.visibility = 'hidden';

            }, 2000);


        }

    } // /isLetterGuessed

    //remove letters already guessed from alphabet array
    function removeLetters(lettersToRemove) {

        if (alpha.indexOf(lettersToRemove) === -1) {

            document.querySelector("." + lettersToRemove).innerHTML = "-";

        }

    };

    var keyFunction = function (event) {

        //run startGame
        if (gameOver === true && gameSet === true) {

            startGame();

        };

        if (gameOver === false && gameSet === true && event.key.charCodeAt(0) >= 97 && event.key.charCodeAt(0) <= 122) {

            checkLetter(event.key);

            isLetterGuessed(event.key);

            removeLetters(event.key);

        }

    } // /keyFunction

    document.onkeydown = keyFunction;

    var clickFunction = function (event) {

        //run startGame
        if (gameOver === true && gameSet === true) {

            startGame();

        }

        if (gameOver === false && gameSet === true && event.target.classList[0] && event.target.classList[0].length === 1 && event.target.classList[0].charCodeAt(0) >= 97 && event.target.classList[0].charCodeAt(0) <= 122) {

            checkLetter(event.target.classList[0].toLowerCase());

            isLetterGuessed(event.target.classList[0].toLowerCase());

            removeLetters(event.target.classList[0].toLowerCase());

        }

    } // /clickFunction

    document.onclick = clickFunction;

    function resetVar() {

        alpha = [];
        guessedAlpha = [];
        correctGuessedAlpha = [];
        guessCount = 7;
        selectedChar = [];
        charCodes = [];
        currentState = [];
        correctGuess = false;
        gameSet = true;

    };

    function hideRemove() {

        document.querySelector(".result").style.display = 'none';
        document.querySelector(".result").style.visibility = 'hidden';
        document.querySelector(".already-guessed").style.display = 'none';
        document.querySelector(".already-guessed").style.visibility = 'hidden';
        document.querySelector(".reset-game").style.display = 'none';
        var lettersToClear = document.querySelector(".letters-to-guess");

        while (lettersToClear.firstChild) {

            lettersToClear.removeChild(lettersToClear.firstChild);

        };

        var nameToClear = document.querySelector(".char-name");

        while (nameToClear.firstChild) {

            nameToClear.removeChild(nameToClear.firstChild);

        };

    };

    function showAdd() {

        document.querySelector(".instructions").style.display = 'block';
        document.querySelector(".main").style.display = 'block';
        createAlphabet();
        charName = charChoices[Math.floor(Math.random() * charChoices.length)];
        charName = charName.toLowerCase();

    };


    function resetGame() {

        //reset
        resetVar();
        //hide
        hideRemove();
        //show
        showAdd();

    };

    document.querySelector('.reset-game').onclick = resetGame;

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