import React, { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';


function App() {
  const [counters, setCounters] = React.useState([0, 0, 0, 0, 0, 0]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
          Attributes
          {counters.map((value, index) => (
            <div key={ATTRIBUTE_LIST[index]}>
              <p>
                {ATTRIBUTE_LIST[index]}: {value}
                <button
                  onClick={() => {
                    const countersCopy = [...counters];
                    countersCopy[index] += 1;
                    setCounters(countersCopy);
                  }}>
                  +
                </button>
                <button
                  onClick={() => {
                    const countersCopy = [...counters];
                    countersCopy[index] -= 1;
                    setCounters(countersCopy);
                  }}>
                  -
                </button>
              </p>

            </div>
         ))}
        </div>
      </section>
    </div>
  );
}

export default App;
