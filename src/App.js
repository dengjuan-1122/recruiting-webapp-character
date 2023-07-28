import React, { useState, useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';


function App() {
  const [counters, setCounters] = React.useState([0, 0, 0, 0, 0, 0]);
  const [showBarbarian, setShowBarbarian] = React.useState(false);
  const [showWizard, setShowWizard] = React.useState(false);
  const [showBard, setShowBard] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [skills, setSkills] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [skillDisabled, setSkillDisabled] = React.useState(false);
  const [counterDisabled, setCounterDisabled] = React.useState(false);
  var skill_sum = skills.reduce((partialSum, a) => partialSum + a, 0);
  var counter_sum = counters.reduce((partialSum, a) => partialSum + a, 0);

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

  const getModifierValue = (modifier) => {
    var index = ATTRIBUTE_LIST.indexOf(modifier);
    var value = Math.floor((counters[index] - 10) / 2);
    return value;
  }

  useEffect(() => {
    setSkillDisabled(skill_sum >= total);
  }, [skill_sum, total]);

  useEffect(() => {
    setCounterDisabled(counter_sum >= 70);
  }, [counter_sum]);

  useEffect(() => {
    fetch('https://recruiting.verylongdomaintotestwith.ca/api/{dengjuan-1122}/character', {
      method: 'POST',
      body: JSON.stringify({
        counters: counters,
        showBarbarian: showBarbarian,
        showWizard: showWizard,
        showBard: showBard,
        skills: skills,
        total: total,
        skillDisabled: skillDisabled, 
      }), 
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => {
        response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  }, []);

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
                {ATTRIBUTE_LIST[index]}: {value} (modifier: {Math.floor((value - 10) / 2)})
                <button
                  disabled={counterDisabled}
                  onClick={() => {
                    const countersCopy = [...counters];
                    countersCopy[index] += 1;
                    setCounters(countersCopy);
                    if (index === 3) {
                      let temp = 0;
                      temp = 4 * (Math.floor((counters[3] + 1 - 10) / 2)) + 10;
                      if (temp >= 0) {
                        setTotal(temp)
                      } else {
                        setTotal(0)
                      }
                    }
                  }}>
                  +
                </button>
                <button
                  onClick={() => {
                    const countersCopy = [...counters];
                    countersCopy[index] -= 1;
                    setCounters(countersCopy);
                    if (index === 3) {
                      let temp = 0;
                      temp = 4 * (Math.floor((counters[3] - 1 - 10) / 2)) + 10;
                      if (temp >= 0) {
                        setTotal(temp)
                      } else {
                        setTotal(0)
                      }
                    }
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
        <div>
          <p> Total skills point available: {total}</p>
          {skills.map((value, index) => (
            <div key={SKILL_LIST[index]["name"]}>
              <p>
                {SKILL_LIST[index]["name"]} - points: {value}
                <button
                  disabled={skillDisabled}
                onClick={() => {
                  const skillCopy = [...skills];
                  skillCopy[index] += 1;
                  setSkills(skillCopy);
                }}>
                +
              </button>
              <button onClick={() => {
                const skillCopy = [...skills];
                skillCopy[index] -= 1;
                setSkills(skillCopy);
              }}>
                -
                </button>
                modifier ({SKILL_LIST[index]["attributeModifier"]}): {getModifierValue(SKILL_LIST[index]["attributeModifier"])} total: {getModifierValue(SKILL_LIST[index]["attributeModifier"]) + value}
                </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
