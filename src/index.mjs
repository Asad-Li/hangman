import "./styles.css";
import wordsArray from "./words.json"; //get words

//Implement all game mechanics
let random = Math.floor(Math.random() * wordsArray.length); //get random array index
let randomWord = wordsArray[random];
const randomWordArr = randomWord.split("");
let userGuessArr = [];
let attempts = 6; //amount of guesses per game
document.getElementById("attempt").innerHTML = attempts;

randomWordArr.forEach((element, index) => {
    let div = document.createElement('div');
    div.innerHTML = "-"; //Hide the secret word with dashes
    div.setAttribute('class', 'words'); //create class attribute and assign words
    document.body.appendChild(div); //set the div in body
    div.id = index;
});

const checkIfUserInputMatches = () => {
    //get character input from user
    const userGuess = document.getElementById("guess").value.toUpperCase();
    console.log(userGuess ,userGuessArr);
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
    }

}

const useOneGuess = () => {
    checkIfUserInputMatches()
    if (attempts < 1) {
        console.log('hanged')
        document.getElementById("hangman").src=`/assets/6.png`;
        loseGame()
    }
    console.log('these are the arrays im testing', userGuessArr, randomWordArr);
    if (userGuessArr.toString() === randomWordArr.toString()) {
        winGame();
    }
}

const winGame = () => {
    const win = document.createElement('h1');
    win.innerHTML = "YOU WON";
    win.style.color = "green"
    document.body.prepend(win);

    //reset game
}

const loseGame = () => {
    const lose = document.createElement('h1');
    lose.innerHTML = "YOU LOSE";
    lose.style.color = "red"
    document.body.prepend(lose);
    //loop over array and set characters
    randomWordArr.forEach((element, index) => {
        document.getElementById(`${index}`).innerHTML = element;
    });

    //reset the game
}

//event listeners
document.getElementById("userguess").addEventListener('click', useOneGuess)

console.log(randomWord);

