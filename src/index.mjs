import "./styles.css";
import wordsArray from "./words.json"; //get words
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
// const express = require('express')
// const app = express()
// const port = 1234


//Implement all game mechanics
let random = Math.floor(Math.random() * wordsArray.length); //get random array index
let randomWord = wordsArray[random];
let randomWordArr = randomWord.split("");
let userGuessArr = [];
let attempts = 6; //amount of guesses per game
let canPlay = true;
let logAllInputs = [];

const encryptWord = () => {
    document.getElementById("attempt").innerHTML = attempts;
    randomWordArr.forEach((element, index) => {
        let div = document.createElement('div');
        div.innerHTML = "-"; //Hide the secret word with dashes
        div.setAttribute('class', 'words'); //create class attribute and assign words
        document.body.appendChild(div); //set the div in body
        div.id = index;
    });
}
encryptWord();

const checkIfUserInputMatches = (userGuess) => {

    if (logAllInputs.includes(userGuess) === true) {
        return
    }

    logAllInputs.push(userGuess);

    //get keyboard input and add class 'disabledBtn'
    // https://stackoverflow.com/questions/15148659/how-can-i-use-queryselector-on-to-pick-an-input-element-by-name
    let selectElement = document.querySelector(`div[data-skbtn=${userGuess.toLowerCase()}]`);
    selectElement.classList.add("disabledBtn")

    console.log(selectElement);
    if (randomWord.includes(userGuess)) {
        randomWordArr.forEach((element, index) => {
            if (element === userGuess) {
                userGuessArr.push(userGuess);
                userGuessArr = randomWordArr.filter(value => userGuessArr.includes(value)); //sort userGuessArr
                document.getElementById(`${index}`).innerHTML = element;
            }
        });
    }
    else {
        --attempts;
        document.getElementById("attempt").innerHTML = attempts;
        let image = 6 //set to number of images in assets
        for (let i = 0; i < attempts; i++) {
            image-- //remove count from images to reverse render order
            document.getElementById("hangman").src=`/assets/${image}.png`;
        }
        console.log(userGuess, userGuessArr, randomWordArr);
    }

    let guessedContainer = document.getElementsByClassName("guessedLetters")[0];
    let guessedLetters = document.createElement("h2")
    guessedLetters.setAttribute('class', 'individualGuess'); //create class attribute and assign words
    guessedLetters.innerHTML = userGuess;
    guessedContainer.appendChild(guessedLetters)
}

const useOneGuess = (userGuess) => {
    checkIfUserInputMatches(userGuess)
        if (attempts < 1) {
            document.getElementById("hangman").src=`/assets/6.png`;
            canPlay = false;
            loseGame()
        }
        if (userGuessArr.toString() === randomWordArr.toString()) {
            canPlay = false;
            winGame();

            // if (!canPlay) {
            //     // promptMessage()
            // }
        }
}

// const promptMessage = () => {
//     prompt('Enter username')
// }

const winGame = () => {
    let win = document.createElement('h2');
    win.innerHTML = "YOU WON";
    win.style.color = "green"
    win.setAttribute('class', 'gameStatus');
    document.body.prepend(win);
}

const loseGame = () => {
    let lose = document.createElement('h2');
    lose.innerHTML = "YOU LOSE";
    lose.style.color = "red"
    lose.setAttribute('class', 'gameStatus');
    document.body.prepend(lose);
    //loop over array and set characters
    randomWordArr.forEach((element, index) => {
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
    random = Math.floor(Math.random() * wordsArray.length); //get random array index
    randomWord = wordsArray[random];
    randomWordArr = randomWord.split("");
    userGuessArr = [];
    attempts = 6;
    canPlay = true;
    encryptWord();
    console.log(randomWord);
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
    //if both are enabled, supports physical input
    physicalKeyboardHighlight: true,
    physicalKeyboardHighlightPress: true
});

function onKeyPress(button){
    console.log("Button pressed", button);
    useOneGuess(button.toUpperCase());
}

// async function getData() {
//     const url = "http://localhost:3000";
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//
//         const json = await response.json();
//         console.log(json);
//     } catch (error) {
//         console.error(error.message);
//     }
// }

// getData()

document.getElementById("reload").addEventListener('click', reloadGame)

console.log(randomWord);

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
