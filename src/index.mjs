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
    console.log(index, randomWord);
}
getRandomWord();
//Hide the secret word with dashes

//Limit the number of guesses to 7

//for each guess if its in the word, reveal the letters

//if not remove one guess

//if guesses reaches 0 game ends and user is "hanged"


console.log("test");
