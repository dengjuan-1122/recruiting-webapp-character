import React, { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';


function App() {
  const [counters, setCounters] = React.useState([0, 0, 0, 0, 0, 0]);

  const changeColor = (counters, s, d, c, i, w, h) => {
    if (counters[0] >= s && counters[1] >= d && counters[2] >= c && counters[3] >= i && counters[4] >= w && counters[5] >= h) {
      return 'red';
    }
    return '';
  }
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
        <div>
          Classes
          {Object.entries(CLASS_LIST).map(([key, value]) =>
            <div key={key}>
              <button style={{
                color: changeColor(counters,
                  value['Strength'],
                  value['Dexterity'],
                  value['Constitution'],
                  value['Intelligence'],
                  value['Wisdom'],
                  value['Charisma'])
              }}>
                {key}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
