import React, { useState, useEffect } from 'react';
import UIfx from 'uifx';

import Drip from './drips/Drip';
import DripModel from './drips/DripModel';
import HomeLink from './ui/HomeLink';
import Instructions from './ui/Instructions';
import AudioControls from './ui/AudioControls';
import Attribution from './ui/Attribution';

import './App.css';

const dripAudio = require('./sounds/drip.wav');
const dripSound = new UIfx(
  dripAudio,
  {
    volume: 0.5
  });

function App() {
  const [drips, setDrips] = useState(new Array<DripModel>());

  function addDrip(e: MouseEvent) {
    const currentDrips = [...drips];

    let newDripId = 1;

    if (drips.length > 0) {
      newDripId = Math.max(...drips.map(drip => drip.id)) + 1;
    }

    const newDrip = new DripModel(
      newDripId,
      e.clientX,
      e.clientY
    );

    currentDrips.push(newDrip);

    setDrips(currentDrips);
    dripSound.play();
  }  

  function handleDripRemoval(dripId: number) {
    const currentDrips = [...drips];

    const filteredDrips = currentDrips.filter(drip => drip.id !== dripId);

    setDrips(filteredDrips);
  }

  useEffect(() => {
    window.addEventListener('mouseup', addDrip);   
    
    return () => {
      window.removeEventListener('mouseup', addDrip);
    }
  });

  return (
    <div className="App">
      <HomeLink />
      <Instructions />
      <AudioControls />
      <Attribution />
      {
        drips && 
        drips.length > 0 && 
        drips.map(drip => {
          return (
            <Drip
              key={drip.id}
              id={drip.id}
              xPos={drip.xPos}
              yPos={drip.yPos}
              onDripRemoval={handleDripRemoval} />
          );
        })
      }
    </div>
  );
}

export default App;
