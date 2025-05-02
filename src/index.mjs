import "./styles.css";
import wordsArray from "./words.json"; //get words

//Implement all game mechanics
let random = Math.floor(Math.random() * wordsArray.length); //get random array index
let randomWord = wordsArray[random];
const randomWordArr = randomWord.split("");
let attempts = 7; //amount of guesses per game
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
    if (randomWord.includes(userGuess)) {
        randomWordArr.forEach((element, index) => {
            if (element === userGuess) {
                document.getElementById(`${index}`).innerHTML = element;
            }
        });
    }
    else {
        --attempts;
        document.getElementById("attempt").innerHTML = attempts;
        let image = 7 //set to number of images in assets
        for (let i = 0; i < attempts; i++) {
            image-- //remove count from images to reverse render order
            document.getElementById("hangman").src=`/assets/${image}.png`;
        }
        console.log(image)
    }
}

const useOneGuess = () => {
    checkIfUserInputMatches()

    if (attempts <= 1) {
        console.log('hanged')
    }
}

//event listeners
document.getElementById("userguess").addEventListener('click', useOneGuess)

console.log(randomWord);

