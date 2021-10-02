import React from 'react';
import "./Form.scss";

const Form = ({handleSubmit,enteredLetter,setEnteredLetter,error}) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type='text'
        placeholder='Enter a letter'
        value={enteredLetter}
        onChange={(e) => setEnteredLetter(e.target.value.toLowerCase())}
      />
      <button type='submit'>Make your guess</button>
      <span>{error && error}</span>
    </form>
  );
};

export default Form;
