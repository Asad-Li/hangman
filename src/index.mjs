import "./styles.css";
import wordsArray from "./words.json"; //get words

//Implement all game mechanics
let random = Math.floor(Math.random() * wordsArray.length); //get random array index
let randomWord = wordsArray[random];
let randomWordArr = randomWord.split("");
let userGuessArr = [];
let attempts = 6; //amount of guesses per game

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

const checkIfUserInputMatches = () => {
    //get character input from user
    const userGuess = document.getElementById("guess").value.toUpperCase();

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
        document.body.appendChild()
        // let wrongLetters = document.getElementById("guessedLetters");
        // wrongLetters.appendChild(wrongLetters).innerHTML = userGuess; //Hide the secret word with dashes
    }

}

const useOneGuess = () => {
    checkIfUserInputMatches()
    if (attempts < 1) {
        document.getElementById("hangman").src=`/assets/6.png`;
        loseGame()
        disableButton()
    }
    if (userGuessArr.toString() === randomWordArr.toString()) {
        winGame();
        disableButton()
    }
}

const disableButton = () => {
    const button = document.getElementById('userguess');
    button.disabled = true;
}

const enableButton = () => {
    const button = document.getElementById('userguess');
    button.disabled = false;
}

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
    while (status.length > 0) status[0].remove(); //go over status array and remove while > 0
    randomWordArr.forEach((element, index) => {
        let div = document.getElementById(`${index}`);
        div.parentNode.removeChild(div);
    });
    randomWordArr = [];
    randomWord = "";
    random = 0;
    random = Math.floor(Math.random() * wordsArray.length); //get random array index
    randomWord = wordsArray[random];
    randomWordArr = randomWord.split("");
    userGuessArr = [];
    attempts = 6;
    encryptWord();
    enableButton();
    console.log(randomWord);
}

//event listeners
document.getElementById("userguess").addEventListener('click', useOneGuess)
document.getElementById("reload").addEventListener('click', reloadGame)

console.log(randomWord);

