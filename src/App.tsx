import React, { useState, useEffect } from 'react';

import Drip from './drips/Drip';
import DripModel from './drips/DripModel';

import './App.css';

function App() {
  const [drips, setDrips] = useState(new Array<DripModel>());

  function addDrip(e: MouseEvent) {
    const currentDrips = Object.assign([], drips);

    currentDrips.push(new DripModel(
      drips.length + 1,
      e.clientX,
      e.clientY
    ));

    setDrips(currentDrips);
  }

  useEffect(() => {
    window.addEventListener('mouseup', addDrip);

    return () => {
      window.removeEventListener('mouseup', addDrip);
    }
  });

  return (
    <div className="App">
      {
        drips && 
        drips.length > 0 && 
        drips.map(drip => {
          return (
            <Drip
              key={drip.id}
              id={drip.id}
              xPos={drip.xPos}
              yPos={drip.yPos} />
          );
        })
      }
      {
        (!drips || 
          drips.length <= 0) && 
          <p>No drips yet.</p>
      }
    </div>
  );
}

export default App;
