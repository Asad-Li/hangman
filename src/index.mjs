import "./styles.css";
import wordsArray from "./words.json"; //get words

//Implement all game mechanics
let index = Math.floor(Math.random() * wordsArray.length); //get random array index
let randomWord = wordsArray[index];

for (const element of randomWord) { //for each randomWord.length display character in div
    let div = document.createElement('div');
    div.innerHTML = "-"; //Hide the secret word with dashes
    div.setAttribute('class', 'words'); //create class attribute and assign words
    div.id = randomWord.indexOf(element); //set the id of div
    document.body.appendChild(div); //set the div in body

}

console.log(randomWord);

//Limit the number of attempts to 7
let attempts = 7; //amount of guesses per game
document.getElementById("attempt").innerHTML = attempts;

const checkIfUserInputMatches = () => {
    //get character input from user
    const userGuess = document.getElementById("guess").value.toUpperCase();

    //convert string to array
    const randomWordArr = randomWord.split("");

    console.log(randomWordArr);
    //get character word positions
    if (randomWordArr.includes(userGuess)) { //if character input is in the randomWord

        // console.log("Contains " + userGuess);
        //reveal the letters
        document.getElementById(`${randomWordArr}`.indexOf(userGuess, 0).toString()).innerHTML = userGuess;
    }
    if (!randomWordArr.includes(userGuess)) { //if character is not in the randomWord

        // console.log("Doesnt Contain " + userGuess);
        attempts--; //remove one attempt
    }

    //substract one guess
    // console.log(attempts);
}

const useOneGuess = () => {

    checkIfUserInputMatches()

}
//event listeners
document.getElementById("userguess").addEventListener('click', useOneGuess)


//if guesses reaches 0 game ends and user is "hanged"
