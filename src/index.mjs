import "./styles.css";
import wordsArray from "./words.json"; //get words

//Implement all game mechanics
//get random array index
let index = Math.floor(Math.random() * wordsArray.length);
let randomWord = wordsArray[index];

for (const element of randomWord) { //for each randomWord.length display character in div
    console.log(element);
    let div = document.createElement('div');
    div.innerHTML = "-"; //Hide the secret word with dashes
    div.setAttribute('class', 'words'); //create class attribute and assign words
    div.id = randomWord.indexOf(element); //set the id of div
    document.body.appendChild(div); //set the div in body

}

//Limit the number of attempts to 7
let attempts = 7; //amount of guesses per game
document.getElementById("attempt").innerHTML = attempts;

const checkIfUserInputMatches = () => {
    //get character input from user
    const userGuess = document.getElementById("guess").value.toUpperCase();

    //convert string to array
    const randomWordArr = randomWord.split("");

    if (randomWordArr.includes(userGuess)) { //if character input is in the randomWord

        console.log("Contains " + userGuess);

        //reveal the letters
    }
    if (!randomWordArr.includes(userGuess)) { //if character is not in the randomWord

        console.log("Doesnt Contain " + userGuess);
        attempts--; //remove one attempt
    }

    //substract one guess
    console.log(attempts);
}

const useOneGuess = () => {

    checkIfUserInputMatches()

}
//event listeners
document.getElementById("userguess").addEventListener('click', useOneGuess)


//if guesses reaches 0 game ends and user is "hanged"
