import React from 'react';
import './Modal.scss';

const Modal = ({ show, guessesLeft, completed, word, startNewGame }) => {
  if (guessesLeft === 0) {
    return (
      <div className={`modal ${show ? 'show' : ''}`}>
        <h2 className='fail'>Game Over</h2>
        <h3>
          You could not guess the word <span>{word}</span> !
        </h3>
        <button onClick={startNewGame}>Try again</button>
      </div>
    );
  } else if (completed) {
    return (
      <div className={`modal ${show ? 'show' : ''}`}>
        <h2 className='win'>Congratulations!</h2>
        <h3>You won the game !!!</h3>
        <button onClick={startNewGame}>New Game</button>
      </div>
    );
  }

  return <div className={`modal ${show ? 'show' : ''}`}></div>;
};

export default Modal;
