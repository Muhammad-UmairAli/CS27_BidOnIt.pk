import Timer from 'react-compound-timer';
import React from 'react';

export default function timer({ time }) {
  return (
    <div>
      <Timer initialTime={60000 * time} direction="backward">
        {() => (
          <React.Fragment>
            <Timer.Hours />
            0:
            <Timer.Minutes />
            :
            <Timer.Seconds />
          </React.Fragment>
        )}
      </Timer>
    </div>
  );
}
