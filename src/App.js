import React, { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';


function App() {
  const [counters, setCounters] = React.useState([0, 0, 0, 0, 0, 0]);
  const [showBarbarian, setShowBarbarian] = React.useState(false);
  const [showWizard, setShowWizard] = React.useState(false);
  const [showBard, setShowBard] = React.useState(false);

  const changeColor = (counters, s, d, c, i, w, h) => {
    if (counters[0] >= s && counters[1] >= d && counters[2] >= c && counters[3] >= i && counters[4] >= w && counters[5] >= h) {
      return 'red';
    }
    return '';
  }

  const showHidden = (key) => {
    if (key === "Barbarian") {
      setShowBarbarian(!showBarbarian)
    } else if (key === "Wizard") {
      setShowWizard(!showWizard)
    } else if (key === "Bard") {
      setShowBard(!showBard)
    }
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
              <button
                onClick={() => showHidden(key)}
                style={{
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
          {(showBarbarian === true) && (
            <div key="Barbarian">
              <h1>Barbarian Mininum Requirements</h1>
              <p>Strength: 14</p>
                            <p>Dexterity: 9</p>
                            <p>Constitution: 9</p>
                            <p>Intelligence: 9</p>
                            <p>Wisdom: 9</p>
                            <p>Charisma: 9</p>
            </div>
          )}
          {(showWizard === true) && (
            <div key="Wizard">
              <h1>Wizard Mininum Requirements</h1>
              <p>Strength: 9</p>
              <p>Dexterity: 9</p>
              <p>Constitution: 9</p>
              <p>Intelligence: 14</p>
              <p>Wisdom: 9</p>
              <p>Charisma: 9</p>
            </div>
          )}
          {(showBard === true) && (
            <div key="Bard">
              <h1>Bard Mininum Requirements</h1>
              <p>Strength: 9</p>
              <p>Dexterity: 9</p>
              <p>Constitution: 9</p>
              <p>Intelligence: 9</p>
              <p>Wisdom: 9</p>
              <p>Charisma: 14</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
