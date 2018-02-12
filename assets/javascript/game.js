(function () {

    var alpha = [];
    var guessedAlpha = [];
    var guessCount = 6;

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
        document.querySelector(".man").style.display = 'none';

        console.log(event.key);

        if (alpha.indexOf(event.key) !== -1) {
            document.querySelector("." + event.key).innerHTML = "-";
        }

        if ((alpha.indexOf(event.key) === -1) && (guessedAlpha.indexOf(event.key) === -1)) {

        } else if ((alpha.indexOf(event.key) === -1)) {
            document.querySelector(".already-guessed").innerHTML = event.key.toUpperCase() + " already guessed!";
            document.querySelector(".already-guessed").style.visibility = 'visible'; 
            
            setTimeout(function() {
                document.querySelector(".already-guessed").style.visibility = 'hidden';
             }, 1000);

        } else {
            var guess = alpha.splice(alpha.indexOf(event.key), 1);
            guess = guess.join();
            guessedAlpha.push(guess);

            if (guessCount < 1) {
                document.querySelector(".man").innerHTML = "GAME OVER";
                document.querySelector(".man").style.display = 'block';
                //show answer

                //reset game
            } else {
                guessCount--
                document.querySelector(".guess-counter").innerHTML = guessCount;
            }
        }
        console.log(guessedAlpha);
    }

    document.onkeydown = keyFunction;

    //blinking text
        var textHidden = false;

        setInterval(textBlink, 500);

        function textBlink() {
            if (textHidden) {
                document.querySelector(".man").style.visibility = 'visible';
            } else {
                document.querySelector(".man").style.visibility = 'hidden';
            }
            textHidden = !textHidden;
        }
    //blinking text

}())