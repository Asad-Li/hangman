# Challenge

## Hangman

The object of hangman is to guess the secret word before the stick figure is hung. Players take turns selecting letters to narrow the word down.

## Objectives

- Implement all game mechanics
- Pick the words from the words.json
- Controls using mouse and keyboard
- Give the user an option to reset the game
- If the word has not been guessed show the word when the user has lost
- Let users save and view highscores (save them in a json file)
    - Highscore is the amount of wrong letters. So a lower score is better.
- Use clean Git guidelines, e.g. branches, clear commit messages, splitting up codes to simple commits, etc.


## Running the template

You can run the project as follows:

First Install the dependencies
```bash
bun install
```

Run the project in dev mode (It's got Hot-reloading setup)
```bash
bun start
```


## Project structure

package.json - Dependencies

README.MD - Project guidelines

src/ - Source directory

src/index.html - Entry HTML file

src/index.mjs - Entry JS file

src/style.css - Entry CSS file

src/words.json - All the words used for the game

src/highscores.json - Highscores file

src/assets/ - Images used
