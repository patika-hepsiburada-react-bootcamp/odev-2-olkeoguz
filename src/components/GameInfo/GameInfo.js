import React from 'react';
import "./GameInfo.scss"

const GameInfo = ({ guessesLeft, lettersGuessed }) => {
  return (
    <div className='gameInfo'>
      <h2>You have <strong>{guessesLeft} </strong> guesses left !</h2>
      <div>
        <span>Wrong Guesses: </span>
        {lettersGuessed.wrongGuesses.map((letter, index) => (
          <span className="wrong" key={index}> {letter} </span>
        ))}
      </div>
      <div>
        <span>Correct Guesses: </span>
        {lettersGuessed.correctGuesses.map((letter, index) => (
          <span className="correct" key={index}> {letter} </span>
        ))}
      </div>
    </div>
  );
};

export default GameInfo;
