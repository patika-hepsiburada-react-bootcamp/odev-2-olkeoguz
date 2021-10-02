import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import Figure from './components/Figure/Figure';
import Form from './components/Form/Form';
import GameInfo from './components/GameInfo/GameInfo';
import Header from './components/UI/Header';
import Spinner from './components/UI/Spinner';
import Modal from './components/UI/Modal';

import getWord from './helpers/getWord';
import SecretWord from './components/SecretWord/SecretWord';
import Hint from './components/Hint/Hint';

const INITIALGUESSEDLETTERS = {
  correctGuesses: [],
  wrongGuesses: [],
};

function App() {
  const [word, setWord] = useState('');
  const [hint, setHint] = useState('');
  const [enteredLetter, setEnteredLetter] = useState('');
  const [error, setError] = useState(null);

  const [lettersGuessed, setLettersGuessed] = useState(INITIALGUESSEDLETTERS);

  const [secretWord, setSecretWord] = useState([]); // Word turned into ----
  const [guessesLeft, setGuessesLeft] = useState(5);
  const [completed, setCompleted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Turning the word into an array of objects with the letter and the isFound info
  useEffect(() => {
    let secret = Array.from(word).map((letter) => ({
      char: letter,
      isFound: false,
    }));
    setSecretWord(secret);
  }, [word]);

  useEffect(() => {
    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i].isFound === false) {
        setCompleted(false);
        return;
      }
      setCompleted(true);
    }
  }, [secretWord]);

  // useCallback needs to be used here because it's a dependency of useEffect below
  const startNewGame = useCallback(async () => {
    setIsLoading(true);
    const { word, hint } = await getWord();
    setWord(word);
    setHint(hint);
    setGuessesLeft(5);
    setLettersGuessed(INITIALGUESSEDLETTERS);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (enteredLetter.length !== 1) {
      setError('Please enter a single letter ');
      return;
      // If user enters a number or anything other than an alphabetic character
    } else if (!enteredLetter.toString().match(/^[aA-zZs]+$/)) {
      setError('Only alphabets are allowed');
      return;
    }
    // If user enters a letter that is already entered and found before
    else if (lettersGuessed.correctGuesses.includes(enteredLetter)) {
      setError(
        `You already guessed ${enteredLetter.toUpperCase()} correctly...`
      );
      return;
    }
    // If user enters a letter that is already entered and found wrong before
    else if (lettersGuessed.wrongGuesses.includes(enteredLetter)) {
      setError(
        `You already tried ${enteredLetter.toUpperCase()} and it is wrong...`
      );
      return;
    }

    checkWord(); // Check if the entered letter is in the word
    setEnteredLetter('');
  };

  const checkWord = () => {
    if (word.includes(enteredLetter)) {
      const updatedSecretWord = secretWord.map((letter) => {
        if (letter.char === enteredLetter) {
          return { ...letter, isFound: true };
        } else {
          return { ...letter };
        }
      });

      setLettersGuessed((prev) => ({
        ...prev,
        correctGuesses: [...prev.correctGuesses, enteredLetter],
      }));

      setSecretWord(updatedSecretWord);
    } else {
      setLettersGuessed((prev) => ({
        ...prev,
        wrongGuesses: [...prev.wrongGuesses, enteredLetter],
      }));
      setGuessesLeft((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='app'>
      <Header />
      <SecretWord secretWord={secretWord} />
      <div className='gameContainer'>
        <GameInfo guessesLeft={guessesLeft} lettersGuessed={lettersGuessed} />
        <div className='gameControl'>
          <Figure guessesLeft={guessesLeft} />
        </div>
      </div>

      {!completed && guessesLeft > 0 && (
        <Form
          enteredLetter={enteredLetter}
          setEnteredLetter={setEnteredLetter}
          handleSubmit={handleSubmit}
          error={error}
        />
      )}

      <Modal
        show={guessesLeft === 0 || completed}
        guessesLeft={guessesLeft}
        completed={completed}
        word={word}
        startNewGame={startNewGame}
      />
      <Hint hint={hint} />
    </div>
  );
}

export default App;
