import React, { useState, useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import Character from './character.js'


function App() {
  const [characters, setCharacters] = React.useState([]);
  const [character, setCharacter] = React.useState(1);
  const onCharactersClick = () => {
    setCharacters(characters.concat(<Character
      key={characters.length}
      />));
  }

  const handleCharacterChange = () => {
    setCharacter();
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <button onClick={onCharactersClick}>Add character</button>
          {characters.map((value, index) => (
            <div key={index}>
              <span>Character: {index + 1}</span>
              {value}
            </div>
          ))}  
      </section>
    </div>
  );
}

export default App;
