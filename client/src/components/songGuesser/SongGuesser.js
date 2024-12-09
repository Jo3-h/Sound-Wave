import React from "react";
import { useState } from "react";

import "./css/SongGuesser.css";

export default function SongGuesser() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handlePlay = () => {
    setIsGameStarted(true);
  };

  return (
    <div className="content-container">
      <div className="song-guesser-container">
        {isGameStarted && (
          <div>
            <div className="game-status-container"></div>
            <div className="guess-entry-container"></div>
            <div className="game-history-container"></div>
          </div>
        )}
        {!isGameStarted && (
          <div>
            <h1>Song Guesser</h1>
            <button onClick={handlePlay}>Play</button>
          </div>
        )}
      </div>
    </div>
  );
}
