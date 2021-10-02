import React from 'react';
import './SecretWord.scss';

const SecretWord = ({ secretWord }) => {
  //Deciding whether to print the letter found or " _ " instead
  return (
    <div>
      {secretWord.map((letter, index) =>
        letter.isFound ? (
          <span className='hyphen' key={index}>
            {letter.char}
          </span>
        ) : (
          <span className='hyphen' key={index}>
            {' '}
            -{' '}
          </span>
        )
      )}
    </div>
  );
};

export default SecretWord;
