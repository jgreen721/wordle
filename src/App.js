import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const currentRef = useRef();
  const [guesses, setGuesses] = useState([]);

  const [guessCounter, setGuessCounter] = useState(0);

  useEffect(() => {
    fetch("words.json")
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);

        let choosenWord = res[(Math.random() * res.length) | 0];
        console.log("ChoosenWord", choosenWord);
        setCurrentWord(choosenWord);
        currentRef.current = choosenWord;
        setGuesses([
          [
            { id: 1, value: 0, letter: "", rightSpot: false },
            { id: 2, value: 0, letter: "", rightSpot: false },
            { id: 3, value: 0, letter: "", rightSpot: false },
            { id: 4, value: 0, letter: "", rightSpot: false },
            { id: 5, value: 0, letter: "", rightSpot: false },
          ],
          [
            { id: 1, value: 0, letter: "", rightSpot: false },
            { id: 2, value: 0, letter: "", rightSpot: false },
            { id: 3, value: 0, letter: "", rightSpot: false },
            { id: 4, value: 0, letter: "", rightSpot: false },
            { id: 5, value: 0, letter: "", rightSpot: false },
          ],
          [
            { id: 1, value: 0, letter: "", rightSpot: false },
            { id: 2, value: 0, letter: "", rightSpot: false },
            { id: 3, value: 0, letter: "", rightSpot: false },
            { id: 4, value: 0, letter: "", rightSpot: false },
            { id: 5, value: 0, letter: "", rightSpot: false },
          ],
          [
            { id: 1, value: 0, letter: "", rightSpot: false },
            { id: 2, value: 0, letter: "", rightSpot: false },
            { id: 3, value: 0, letter: "", rightSpot: false },
            { id: 4, value: 0, letter: "", rightSpot: false },
            { id: 5, value: 0, letter: "", rightSpot: false },
          ],
          [
            { id: 1, value: 0, letter: "", rightSpot: false },
            { id: 2, value: 0, letter: "", rightSpot: false },
            { id: 3, value: 0, letter: "", rightSpot: false },
            { id: 4, value: 0, letter: "", rightSpot: false },
            { id: 5, value: 0, letter: "", rightSpot: false },
          ],
        ]);
      });
    setGuessCounter(0);
  }, [score]);

  const checkGuess = () => {
    if (guess.length !== 5) {
      toggleMsg("Invalid guess! :/");
      return;
    }
    checkLetters(guess);
  };

  const toggleMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 1500);
  };

  const checkLetters = (guess) => {
    let temp_guesses = guesses;
    let temp_row = temp_guesses[guessCounter];
    let tempWord = currentRef.current;
    console.log(tempWord);
    tempWord = tempWord.split("");
    guess.split("").forEach((letter, idx) => {
      let letterIdx = tempWord.indexOf(letter);
      console.log("Idx", letterIdx);
      if (letterIdx !== -1) {
        //check if guessLetterIdx === currentWordIdx

        if (guess[letterIdx] === currentWord[letterIdx]) {
          temp_row[idx].rightSpot = true;
        }
        temp_row[idx].value = 1;

        // nerf found letter from currentRef
        tempWord.splice(letterIdx, 1);
        console.log(tempWord);
        currentRef.current = tempWord.join("");
      } else {
        console.log("WTF?");
        temp_row[idx].value = -1;
      }
      temp_row[idx].letter = letter;
    });
    temp_guesses[guessCounter] = temp_row;
    setGuesses(temp_guesses);
    // console.log(guesses);
    setGuess("");
    setGuessCounter(guessCounter + 1);
    if (guessCounter === 4) {
      setTimeout(() => {
        var guess = prompt("Thats all the guesses? Can you guess the word?");
        if (guess === currentWord) {
          alert("You win!");
          setScore(score + 100);
        } else {
          alert("aww sorry!!");
          setScore(score - 25);
        }
      }, 2000);
    }
  };

  return (
    <div className="app">
      <div className="game-app">
        <h1>Wordle Guess Game</h1>
        <h4>Score:{score}</h4>
        <div className="key-row">
          <h3>KeyMap:</h3>
          <div className="keys">
            {/* <h3>Cur: {currentWord}</h3>
          <h3>Ref:{currentRef.current}</h3> */}
            <div className="key">
              <h4>Right Letter/Location: </h4>
              <div className="key-square right-spot"></div>
            </div>
            <div className="key">
              <h4>Right Letter:</h4>
              <div className=" key-square right-letter"></div>
            </div>
            <div className="key">
              <h4>X:</h4>
              <div className=" key-square wrong"></div>
            </div>
          </div>
        </div>
        <h5>{message}</h5>
        <div className="game-board">
          {guesses.length &&
            guesses.map((guessRow, y) =>
              guessRow.map((g, x) => (
                <div
                  key={`${y}:${x}`}
                  className={
                    g.value === 0
                      ? "board-tile empty"
                      : g.value === -1
                      ? "board-tile wrong"
                      : g.rightSpot === true
                      ? "board-tile right-spot"
                      : "board-tile right-letter"
                  }
                >
                  {g.letter}
                </div>
              ))
            )}
        </div>
        <label htmlFor="word">Guess:</label>
        <input
          type="text"
          name="guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Guess"
        />
        <button onClick={checkGuess}>Enter</button>
        <p>Footer&copy;</p>
      </div>
    </div>
  );
}

export default App;
