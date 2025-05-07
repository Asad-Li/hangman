import "./styles.css";
import wordsArray from "./words.json"; // Get words
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
let random = Math.floor(Math.random() * wordsArray.length);
let randomWord = wordsArray[random];
let randomWordArr = randomWord.split("");
let userGuessArr = [];
let attempts = 6; // Amount of guesses per game
let canPlay = true;
let logAllInputs = [];

const displayHiddenWord = () => {
    document.getElementById("attempt").innerHTML = attempts;
    randomWordArr.forEach((element, index) => {
        let div = document.createElement('div');
        div.innerHTML = "-"; // Hide the secret word with dashes
        div.setAttribute('class', 'words');
        document.body.appendChild(div);
        div.id = index;
    });
}

const checkIfUserInputMatches = (userGuess) => {

    if (logAllInputs.includes(userGuess) === true) {
        return;
    }

    logAllInputs.push(userGuess);

    // Get keyboard input and add class 'disabledBtn'
    let selectElement = document.querySelector(`div[data-skbtn=${userGuess.toLowerCase()}]`);
    selectElement.classList.add("disabledBtn");

    if (randomWord.includes(userGuess)) {
        randomWordArr.forEach((element, index) => {
            if (element === userGuess) {
                userGuessArr.push(userGuess);
                userGuessArr = randomWordArr.filter(value => userGuessArr.includes(value)); // Sort userGuessArr
                document.getElementById(`${index}`).innerHTML = element;
            }
        });
    } else {
        attempts--;
        document.getElementById("attempt").innerHTML = attempts;
        // Set to number of images in assets
        let image = 6;
        for (let i = 0; i < attempts; i++) {
            // Remove count from images to reverse render order
            image--;
            document.getElementById("hangman").src=`/assets/${image}.png`;
        }
    }
    let guessedContainer = document.getElementsByClassName("guessedLetters")[0];
    let guessedLetters = document.createElement("h2");
    guessedLetters.setAttribute('class', 'individualGuess'); // Create class attribute and assign words
    guessedLetters.innerHTML = userGuess;
    guessedContainer.appendChild(guessedLetters);
}

const useOneGuess = (userGuess) => {
    checkIfUserInputMatches(userGuess)
        if (attempts < 1) {
            document.getElementById("hangman").src=`/assets/6.png`;
            canPlay = false;
            loseGame();
        }
        if (userGuessArr.toString() === randomWordArr.toString()) {
            canPlay = false;
            winGame();
        }
}

const winGame = () => {
    let win = document.createElement('h2');
    win.innerHTML = "YOU WON";
    win.style.color = "green";
    win.setAttribute('class', 'gameStatus');
    document.body.prepend(win);
}

const loseGame = () => {
    let lose = document.createElement('h2');
    lose.innerHTML = "YOU LOSE";
    lose.style.color = "red";
    lose.setAttribute('class', 'gameStatus');
    document.body.prepend(lose);
    randomWordArr.forEach((element, index) => { // Loop over array and set characters
        document.getElementById(`${index}`).innerHTML = element;
    });
}

const reloadGame = () => {
    document.getElementById("hangman").src=`/assets/0.png`;
    let status = document.getElementsByClassName("gameStatus");
    let individualGuesses = document.getElementsByClassName("individualGuess");

    while (individualGuesses.length > 0) individualGuesses[0].remove();
    while (status.length > 0) status[0].remove(); //go over status array and remove while > 0

    randomWordArr.forEach((element, index) => {
        let div = document.getElementById(`${index}`);
        div.parentNode.removeChild(div);
    });
    document.querySelectorAll('div[data-skbtn]').forEach(element => {
        element.classList.remove('disabledBtn');
    });
    randomWordArr = [];
    logAllInputs = [];
    randomWord = "";
    random = 0;
    random = Math.floor(Math.random() * wordsArray.length);
    randomWord = wordsArray[random];
    randomWordArr = randomWord.split("");
    userGuessArr = [];
    attempts = 6;
    canPlay = true;
    displayHiddenWord();
}

const keyboard = new Keyboard({
    onKeyPress: button =>  {
        if (canPlay === false) {
            return
        }
        onKeyPress(button)
    },
    layout: {
        'default': [
            'q w e r t y u i o p',
            'a s d f g h j k l',
            'z x c v b n m',
        ]
    },
    // If both are enabled, supports physical input
    physicalKeyboardHighlight: true,
    physicalKeyboardHighlightPress: true
});

const onKeyPress = (button) => {
    useOneGuess(button.toUpperCase());
}

document.getElementById("reload").addEventListener('click', reloadGame);

displayHiddenWord();
