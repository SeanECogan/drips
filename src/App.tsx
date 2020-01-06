import React, { useState, useEffect } from 'react';

import Drip from './drips/Drip';
import DripModel from './drips/DripModel';

import './App.css';

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
  }  

  useEffect(() => {
    window.addEventListener('mouseup', addDrip);

    const dripCleanupInterval = setInterval(() => {
      const currentDrips = [...drips];

      const filteredDrips = currentDrips.filter(drip => {
        var dripCreatedAt = new Date(drip.createdAt);

        var dripExpirationTime = new Date(dripCreatedAt.setSeconds(drip.createdAt.getSeconds() + 2));

        return dripExpirationTime > new Date();
      }, 250);

      setDrips(filteredDrips);
    })

    return () => {
      window.removeEventListener('mouseup', addDrip);

      clearInterval(dripCleanupInterval);
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
