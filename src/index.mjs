import "./styles.css";
import words from "./words.json";

//Implement all game mechanics

//get words
const wordsArray = words;

//Choose a secret word from words.json
const getRandomWord = () => {
    //get random array index
    let index = Math.floor(Math.random() * wordsArray.length);
    let randomWord = wordsArray[index];

    //for each randomWord.length display character in div
    for (const element of randomWord) {
        console.log(element);
        let div = document.createElement('div');
        div.innerHTML = "-"; //Hide the secret word with dashes
        div.setAttribute('class', 'words'); //create class attribute and assign words
        document.body.appendChild(div); //set the div in body
    }

}

getRandomWord();

//Limit the number of guesses to 7

let guess = 7; //amount of guesses per game


//for each guess if its in the word, reveal the letters

//if not remove one guess

//if guesses reaches 0 game ends and user is "hanged"


console.log("test");
