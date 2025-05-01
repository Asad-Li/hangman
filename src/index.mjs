import "./styles.css";
import wordsArray from "./words.json"; //get words

//Implement all game mechanics
let random = Math.floor(Math.random() * wordsArray.length); //get random array index
let randomWord = wordsArray[random];
const randomWordArr = randomWord.split("");

randomWordArr.forEach((element, index) => {
    let div = document.createElement('div');
    div.innerHTML = "-"; //Hide the secret word with dashes
    div.setAttribute('class', 'words'); //create class attribute and assign words
    document.body.appendChild(div); //set the div in body
    div.id = index;
});

//Limit the number of attempts to 7
let attempts = 7; //amount of guesses per game
document.getElementById("attempt").innerHTML = attempts;

const checkIfUserInputMatches = () => {
    //get character input from user
    const userGuess = document.getElementById("guess").value.toUpperCase();
    //convert string to array

    randomWordArr.forEach((element, index) => {

        if (element === userGuess) {
            document.getElementById(`${index}`).innerHTML = element;
        }
        else {
            attempts--;
        }

    });
}

const useOneGuess = () => {

    checkIfUserInputMatches()

}
//event listeners
document.getElementById("userguess").addEventListener('click', useOneGuess)

console.log(randomWord);
//if guesses reaches 0 game ends and user is "hanged"
